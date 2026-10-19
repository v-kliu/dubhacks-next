// Batch 6 application forms and the short track blurbs shown wherever we link to them.
// These are the public respondent links from each form's "Send" dialog (never the /edit link).

// Flip to true in the same commit that adds the form URLs below. While false, the site shows
// the "opens October 19" state with no apply buttons.
export const APPLICATIONS_OPEN = false;
export const OPEN_DATE = 'October 19';
export const PRIORITY_DEADLINE = 'October 26';
export const FINAL_DEADLINE = 'November 2';

export interface TrackApplication {
  id: 'eir' | 'project';
  overline: string;
  title: string;
  description: string;
  applyLabel: string;
  /** Public Google Form link. Left out until applications open. */
  applicationUrl?: string;
}

export const trackApplications: TrackApplication[] = [
  {
    id: 'eir',
    overline: 'EIR TRACK',
    title: 'For Explorers',
    description:
      'No startup yet, but you want to build one. Join as an Entrepreneur-in-Residence to learn the ropes, meet potential co-founders, and explore ideas with the Next community.',
    applyLabel: 'Apply as an EiR'
  },
  {
    id: 'project',
    overline: 'PROJECT TRACK',
    title: 'For Builders',
    description:
      'Already working on something? Bring your team and project into the incubator for goal-setting, mentorship, and a spot at Demo Day.',
    applyLabel: 'Apply with a Project'
  }
];

// Exact cut-offs for the countdown: end of day in Seattle (PDT on Oct 26, PST on Nov 2)
export const PRIORITY_DEADLINE_AT = '2026-10-26T23:59:59-07:00';
export const FINAL_DEADLINE_AT = '2026-11-02T23:59:59-08:00';
