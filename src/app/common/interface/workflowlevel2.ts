
export interface WorkflowLevel2 {
  id?: any;
  name: string;
  status?: string;
  total_estimated_budget?: number;
  actual_start_date?: string;
  actual_end_date?: string;
  actual_duration?: string;
  on_time?: boolean;
  workflowlevel1?: string;
  parent_workflowlevel2: number|string;
  activities?: Array<WorkflowLevel2>;
  url?: string;
  localId?: string;
  expected_start_date?: string;
  expected_end_date?: string;
  stakeholder?: any;
  site?: Array<string>;
  approval?: Array<string>;
  indicators?: Array<string>;
  date_of_request?: string;
  description?: string;
  justification_background?: string;
  risks_assumptions?: string;
  description_of_government_involvement?: string;
  description_of_community_involvement?: string;
  community_handover?: boolean;
  capacity_built?: string;
  quality_assured?: string;
  issues_and_challenges?: string;
  lessons_learned?: string;
  progress?: string;
  sector?: string;
  office?: string;
  partners?: string;
  milestone?: string
}
