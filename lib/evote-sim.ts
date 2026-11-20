/**
 * In-browser model of Collabs e-Vote's ballot rules.
 * The checks run in the same order as the real POST /api/student/vote handler:
 * session role → election is LIVE → ballot not empty → student hasn't voted → atomic write.
 * One extra check is added here — every choice must be a contestant visible to
 * that student for that position — a hardening step planned for the real app.
 * Data here is sample data; nothing is sent anywhere.
 */

export type ElectionStatus = 'UPCOMING' | 'LIVE' | 'COMPLETED';
export type Visibility = 'ALL_STUDENTS' | 'SPECIFIC_GRADE' | 'SPECIFIC_SECTION';

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  has_voted: boolean;
}
export interface Contestant {
  id: string;
  name: string;
  grade: string;
  section: string;
  position: string;
  visibility: Visibility;
}
export interface Vote {
  studentId: string;
  contestantId: string;
  position: string;
  receipt: string;
}
export interface School {
  election_status: ElectionStatus;
  positions: string[];
  students: Student[];
  contestants: Contestant[];
  votes: Vote[];
}

export function sampleSchool(): School {
  return {
    election_status: 'LIVE',
    positions: ['President', 'Class Representative'],
    students: [
      { id: 'S-101', name: 'Student A', grade: '11', section: 'A', has_voted: false },
      { id: 'S-102', name: 'Student B', grade: '11', section: 'B', has_voted: false },
      { id: 'S-201', name: 'Student C', grade: '12', section: 'A', has_voted: false },
    ],
    contestants: [
      { id: 'C-1', name: 'Candidate Ayaan', grade: '12', section: 'A', position: 'President', visibility: 'ALL_STUDENTS' },
      { id: 'C-2', name: 'Candidate Zara', grade: '12', section: 'B', position: 'President', visibility: 'ALL_STUDENTS' },
      { id: 'C-3', name: 'Candidate Hamza', grade: '11', section: 'A', position: 'Class Representative', visibility: 'SPECIFIC_SECTION' },
      { id: 'C-4', name: 'Candidate Iqra', grade: '11', section: 'B', position: 'Class Representative', visibility: 'SPECIFIC_SECTION' },
      { id: 'C-5', name: 'Candidate Bilal', grade: '12', section: 'A', position: 'Class Representative', visibility: 'SPECIFIC_GRADE' },
    ],
    votes: [],
  };
}

/** Mirrors the Prisma `findMany` visibility filter used to build each student's ballot. */
export function ballotFor(school: School, student: Student) {
  return school.contestants.filter(
    (c) =>
      c.visibility === 'ALL_STUDENTS' ||
      (c.visibility === 'SPECIFIC_GRADE' && c.grade === student.grade) ||
      (c.visibility === 'SPECIFIC_SECTION' && c.grade === student.grade && c.section === student.section),
  );
}

export interface Check {
  rule: string;
  passed: boolean;
}
export interface SubmitResult {
  status: number;
  body: Record<string, unknown>;
  checks: Check[];
  school: School;
}

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function submitBallot(
  school: School,
  session: { role: 'student' | 'guest'; studentId?: string },
  votes: Record<string, string>,
): Promise<SubmitResult> {
  const checks: Check[] = [];
  const fail = (status: number, message: string): SubmitResult => ({ status, body: { message }, checks, school });

  const authed = session.role === 'student' && !!session.studentId;
  checks.push({ rule: 'Session belongs to a student', passed: authed });
  if (!authed) return fail(401, 'Unauthorized');

  const live = school.election_status === 'LIVE';
  checks.push({ rule: 'Election status is LIVE', passed: live });
  if (!live) return fail(403, 'The election booth is currently closed.');

  const nonEmpty = Object.keys(votes).length > 0;
  checks.push({ rule: 'Ballot is not empty', passed: nonEmpty });
  if (!nonEmpty) return fail(400, 'Empty ballot submitted.');

  const student = school.students.find((s) => s.id === session.studentId)!;
  checks.push({ rule: 'Student has not voted yet', passed: !student.has_voted });
  if (student.has_voted) return fail(400, 'You have already cast your ballot!');

  const visible = ballotFor(school, student);
  const valid = Object.entries(votes).every(([pos, cid]) => visible.some((c) => c.id === cid && c.position === pos));
  checks.push({ rule: 'Each choice is a visible contestant for that position', passed: valid });
  if (!valid) return fail(400, 'Invalid contestant for this ballot.');

  const ts = new Date().toISOString();
  const newVotes: Vote[] = [];
  for (const [position, contestantId] of Object.entries(votes)) {
    const receipt = await sha256(`${student.id}-${contestantId}-${position}-${ts}-${Math.random()}`);
    newVotes.push({ studentId: student.id, contestantId, position, receipt });
  }
  checks.push({ rule: 'Votes + has_voted written in one transaction', passed: true });

  const next: School = {
    ...school,
    votes: [...school.votes, ...newVotes],
    students: school.students.map((s) => (s.id === student.id ? { ...s, has_voted: true } : s)),
  };
  return {
    status: 200,
    body: { message: 'Ballot cast successfully', receipts: newVotes.map((v) => v.receipt.slice(0, 16) + '…') },
    checks,
    school: next,
  };
}

export function tally(school: School) {
  const counts = new Map<string, number>();
  for (const v of school.votes) counts.set(v.contestantId, (counts.get(v.contestantId) ?? 0) + 1);
  return school.positions.map((position) => ({
    position,
    rows: school.contestants
      .filter((c) => c.position === position)
      .map((c) => ({ ...c, votes: counts.get(c.id) ?? 0 })),
  }));
}
