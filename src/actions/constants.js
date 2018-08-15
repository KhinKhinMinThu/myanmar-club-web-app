// export const BASE_URL = 'http://demo0532724.mockable.io';
// 'http://54.200.158.0/MyanmarClubAPI';
export const BASE_URL = 'http://34.220.151.95/MyanmarClubAPI';

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';

export const DATETIME_FORMAT_DB = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT_DB = 'HH:mm:ss';
export const DEFAULT_DATETIME = '2000-01-01 00:00';
export const DEFAULT_DATE = '2000-01-01';
export const DEFAULT_TIME = '00:00';

export const NATIONALITY_LIST = ['myanmar', 'singaporean'];
export const RELIGION_LIST = ['buddhism', 'islam', 'hinduism', 'christianity'];

export const MEMBERSHIP_TYPES = {
  TYP1: 'TYP1:Life (ရာသက်ပန်) = SGD 350',
  TYP2:
    'TYP2:Singaporean/ PR/ EP Ordinary SGD 74 + Member Card SGD 5 (1st time) = SGD 79',
  TYP3: 'TYP3:Other Passes SGD 24 + Member Card SGD 5 (1st time) = SGD 29',
  TYP4: 'TYP4:Yearly Renewal Fees SGD 24 + New Member Card SGD 5 = SGD 29',
  TYP5:
    'TYP5:6 Month Fees SGD 12 (*not entitled for member card/ အသင်းဝင်ကဒ်ရမည် မဟုတ်ပါ)',
};
export const MEMBERSHIP_FEES = {
  TYP1: 350,
  TYP2: 79,
  TYP3: 29,
  TYP4: 29,
  TYP5: 12,
};

// APIGET API URLS
export const APIGET_ROLEDATA = '/getRoleData';
export const APIGET_MEMBERSDATA = '/admin/getMembersData';
export const APIGET_CLAIMSDATA = '/claim/getClaimsData';
export const APIGET_EVENTTRANSCDATA = '/event/getEventsTranscData';
export const APIGET_EVENTSDATA = '/event/getEventsData';
export const APIGET_MEBERFORMFIELDS = '/admin/memberFormFields';
// end

// POST API URLS
export const APIPOST_LOGIN = '/admin/login';

export const APIPOST_UPDATE_ROLE = '/updateRole';

export const APIGET_MEMBERDATA = '/admin/getMemberData';
export const APIPOST_DELETE_MEMBERS = '/admin/deleteMembers';
export const APIPOST_UPDATE_PROFILE = '/admin/updateProfile';
export const APIPOST_UPDATE_MEMBERSHIP = '/admin/updateMembership';

export const APIPOST_APPROVE_CLAIMS = '/claim/approveClaims';
export const APIPOST_UNAPPROVE_CLAIMS = '/claim/unapproveClaims';

export const APIGET_EVENTDATA = '/event/getEventData';
export const APIPOST_DELETE_EVENTTRANSC = '/event/deleteEventTransaction';
export const APIPOST_ADD_EVENTTRANSC = '/event/addEventTransaction';
export const APIPOST_DELETE_EVENT = '/event/deleteEvent';
export const APIPOST_DELETE_EVENT_RSVP = '/event/deleteRegistrations';
export const APIPOST_UPDATE_EVENT = '/event/updateEvent';
export const APIPOST_ADD_EVENT = '/event/createEvent';
export const APIPOST_ADD_EVENTPHOTO = '/event/eventPhoto';
export const APIPOST_NOTIFY_EVENT = '/event/sendEventNotification';

export const APIPOST_FORGOTPWD = '/admin/forgotPassword';
// end
