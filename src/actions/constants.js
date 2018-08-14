// export const BASE_URL = 'http://demo0532724.mockable.io';
// 'http://54.200.158.0/MyanmarClubAPI';
export const BASE_URL = 'http://34.220.151.95/MyanmarClubAPI';

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';

export const DATETIME_FORMAT_DB = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT_DB = 'HH:mm:ss';
export const DEFAULT_DATETIME = '01-01-2000 00:00';
export const DEFAULT_DATE = '01-01-2000';
export const DEFAULT_TIME = '00:00';

export const NATIONALITY_LIST = ['singaporean'];
export const RELIGION_LIST = ['buddhism', 'islam', 'hinduism', 'christianity'];

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
