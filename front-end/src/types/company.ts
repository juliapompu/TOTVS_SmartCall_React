export interface Meeting {
  id: number;
  title: string;
  dateTime: string;
  participants: string[];
  transcription: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string;
  meetingsCount: number;
  people: string[];
  location: string;
  tagline: string;
  sector: string;
  website: string;
  description: string;
  highlights: string[];
  focusAreas: string[];
  createdAt: string;
  meetings: Meeting[];
}

export interface ActionItem {
  id: string;
  task: string;
  assignee?: string;
  deadline?: string;
}

export interface MeetingInsights {
  summary: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  keyTopics: string[];
  keyDecisions: string[];
  actionItems: ActionItem[];
  overallTone: string;
}

export interface UploadTranscriptionPayload {
  companyId: number;
  participants: string[];
  file: File;
}

export interface UploadTranscriptionResponse {
  success: boolean;
  message: string;
  insights: MeetingInsights;
}