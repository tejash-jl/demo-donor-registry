const REDIS_URL = process.env.REDIS_URL;
const BASE_URL = process.env.BASE_URL;
const ABHA_CLIENT_URL = process.env.ABHA_CLIENT_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REGISTRY_URL = process.env.REGISTRY_URL;
const CERTIFICATE_API_URL = process.env.CERTIFICATE_API_URL;
const EXPIRE_PROFILE = process.env.EXPIRE_PROFILE;
const ESIGN_ESP_URL = process.env.ESIGN_ESP_URL;
const ESIGN_ESP_PDF_URL = process.env.ESIGN_ESP_PDF_URL;
const ESIGN_FORM_SIGN_URL = process.env.ESIGN_FORM_SIGN_URL;
const ESIGN_FORM_REPLACE_URL = process.env.ESIGN_FORM_REPLACE_URL;
const PORTAL_PLEDGE_REGISTER_URL = process.env.PORTAL_PLEDGE_REGISTER_URL;
const SERVICE_ACCOUNT_CLIENT_SECRET = process.env.SERVICE_ACCOUNT_CLIENT_SECRET;
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
const LOG_LEVEL = process.env.LOG_LEVEL || "INFO";
const NUMBER_OF_DIGITS = process.env.NUMBER_OF_DIGITS || 7;
const UNIQUE_ABHA_ENABLED = process.env.UNIQUE_ABHA_ENABLED === "true" || false;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;
const LOGIN_LINK = process.env.LOGIN_LINK;
const INVITE_TEMPLATE_ID = process.env.INVITE_TEMPLATE_ID;
const NOTIFY_TEMPLATE_ID = process.env.NOTIFY_TEMPLATE_ID;
const UPDATE_TEMPLATE_ID = process.env.UPDATE_TEMPLATE_ID;
const UNPLEDGE_TEMPLATE_ID = process.env.UNPLEDGE_TEMPLATE_ID;
const API_KEY = process.env.API_KEY;
const ESIGN_STATUS = Object.freeze({
    'PENDING': 0,
    'SUCCESS': 1,
    'FAILED': 2,
    'EXPIRED': 3,
});
const ESIGN_VALIDATION_KAFKA_BROKERS = process.env.ESIGN_VALIDATION_KAFKA_BROKERS || 'localhost:5101';
let ESIGN_VALIDATION_EXPIRE_TIME = process.env.ESIGN_VALIDATION_EXPIRE_TIME || 2*60;
const ESIGN_VALIDATION_PREVENT_3RD_PARTY = process.env.ESIGN_VALIDATION_PREVENT_3RD_PARTY === "true" || false;
const METRICS_URL = process.env.METRICS_URL || 'http://metrics:8070';
const KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';
const METRICS_TOPIC = process.env.METRICS_TOPIC || 'events';
const ESIGN_VALIDATION_KAFKA_TOPIC = process.env.ESIGN_VALIDATION_KAFKA_TOPIC || 'esign_topic';
const ESIGN_VALIDATION_KAFKA_TOPIC_GROUP = process.env.ESIGN_VALIDATION_KAFKA_TOPIC_GROUP || 'dev_esign_group_1';
const ESIGN_VALIDATION_CLIENT_ID = process.env.ESIGN_VALIDATION_CLIENT_ID || "dev-esign-client";
try {
    ESIGN_VALIDATION_EXPIRE_TIME = parseInt(ESIGN_VALIDATION_EXPIRE_TIME, 10);
    if(isNaN(ESIGN_VALIDATION_EXPIRE_TIME)) {
        ESIGN_VALIDATION_EXPIRE_TIME = 120;
    }
} catch (e) {
    console.log(e);
}
module.exports = {
    REDIS_URL,
    BASE_URL,
    CLIENT_ID,
    CLIENT_SECRET,
    REGISTRY_URL,
    CERTIFICATE_API_URL,
    EXPIRE_PROFILE,
    ESIGN_ESP_URL,
    ESIGN_FORM_SIGN_URL,
    ESIGN_FORM_REPLACE_URL,
    PORTAL_PLEDGE_REGISTER_URL,
    ESIGN_ESP_PDF_URL,
    SERVICE_ACCOUNT_CLIENT_SECRET,
    KEYCLOAK_URL,
    LOG_LEVEL,
    NUMBER_OF_DIGITS,
    UNIQUE_ABHA_ENABLED,
    NOTIFICATION_SERVICE_URL,
    LOGIN_LINK,
    INVITE_TEMPLATE_ID,
    NOTIFY_TEMPLATE_ID,
    ABHA_CLIENT_URL,
    UPDATE_TEMPLATE_ID,
    UNPLEDGE_TEMPLATE_ID,
    API_KEY,
    ESIGN_VALIDATION_KAFKA_BROKERS,
    ESIGN_VALIDATION_EXPIRE_TIME,
    ESIGN_STATUS,
    ESIGN_VALIDATION_PREVENT_3RD_PARTY,
    ESIGN_VALIDATION_KAFKA_TOPIC,
    ESIGN_VALIDATION_KAFKA_TOPIC_GROUP,
    METRICS_URL,
    KAFKA_BROKER,
    METRICS_TOPIC,
    ESIGN_VALIDATION_CLIENT_ID
}
