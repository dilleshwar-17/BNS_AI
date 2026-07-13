/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuration management for BNS AI application
 */

export interface AppConfig {
  // API Configuration
  geminiApiKey: string;
  apiBaseUrl: string;
  apiTimeout: number;

  // Application Configuration
  appName: string;
  appVersion: string;
  environment: 'development' | 'staging' | 'production';

  // Feature Flags
  enableVoiceMode: boolean;
  enableDeepResearch: boolean;
  enableLegalDrafting: boolean;
  enableCompareActs: boolean;
  enableKnowledgeGraph: boolean;

  // Voice Configuration
  voiceRecognitionLang: string;
  voiceSynthesisLang: string;
  voiceRecognitionTimeout: number;

  // Rate Limiting
  rateLimitRequests: number;
  rateLimitWindow: number;

  // Logging
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enableConsoleLogs: boolean;

  // Security
  enableHttps: boolean;
  corsOrigin: string;

  // Analytics
  analyticsEnabled: boolean;
  analyticsKey: string;

  // Error Reporting
  errorReportingEnabled: boolean;
  errorReportingKey: string;
}

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: AppConfig = {
  geminiApiKey: '',
  apiBaseUrl: 'http://localhost:3001/api',
  apiTimeout: 30000,
  appName: 'BNS AI',
  appVersion: '4.0.2',
  environment: 'development',
  enableVoiceMode: true,
  enableDeepResearch: true,
  enableLegalDrafting: true,
  enableCompareActs: true,
  enableKnowledgeGraph: true,
  voiceRecognitionLang: 'en-IN',
  voiceSynthesisLang: 'en-IN',
  voiceRecognitionTimeout: 10000,
  rateLimitRequests: 100,
  rateLimitWindow: 3600000,
  logLevel: 'info',
  enableConsoleLogs: true,
  enableHttps: false,
  corsOrigin: 'http://localhost:5173',
  analyticsEnabled: false,
  analyticsKey: '',
  errorReportingEnabled: false,
  errorReportingKey: '',
};

/**
 * Loads configuration from environment variables
 * @returns Application configuration
 */
export const loadConfig = (): AppConfig => {
  const config: AppConfig = { ...DEFAULT_CONFIG };

  // Load from environment variables (Vite prefixes with VITE_)
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    config.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  }

  if (import.meta.env.VITE_API_BASE_URL) {
    config.apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  }

  if (import.meta.env.VITE_API_TIMEOUT) {
    config.apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT, 10);
  }

  if (import.meta.env.VITE_APP_NAME) {
    config.appName = import.meta.env.VITE_APP_NAME;
  }

  if (import.meta.env.VITE_APP_VERSION) {
    config.appVersion = import.meta.env.VITE_APP_VERSION;
  }

  if (import.meta.env.VITE_ENVIRONMENT) {
    config.environment = import.meta.env.VITE_ENVIRONMENT as AppConfig['environment'];
  }

  // Feature flags
  if (import.meta.env.VITE_ENABLE_VOICE_MODE !== undefined) {
    config.enableVoiceMode = import.meta.env.VITE_ENABLE_VOICE_MODE === 'true';
  }

  if (import.meta.env.VITE_ENABLE_DEEP_RESEARCH !== undefined) {
    config.enableDeepResearch = import.meta.env.VITE_ENABLE_DEEP_RESEARCH === 'true';
  }

  if (import.meta.env.VITE_ENABLE_LEGAL_DRAFTING !== undefined) {
    config.enableLegalDrafting = import.meta.env.VITE_ENABLE_LEGAL_DRAFTING === 'true';
  }

  if (import.meta.env.VITE_ENABLE_COMPARE_ACTS !== undefined) {
    config.enableCompareActs = import.meta.env.VITE_ENABLE_COMPARE_ACTS === 'true';
  }

  if (import.meta.env.VITE_ENABLE_KNOWLEDGE_GRAPH !== undefined) {
    config.enableKnowledgeGraph = import.meta.env.VITE_ENABLE_KNOWLEDGE_GRAPH === 'true';
  }

  // Voice configuration
  if (import.meta.env.VITE_VOICE_RECOGNITION_LANG) {
    config.voiceRecognitionLang = import.meta.env.VITE_VOICE_RECOGNITION_LANG;
  }

  if (import.meta.env.VITE_VOICE_SYNTHESIS_LANG) {
    config.voiceSynthesisLang = import.meta.env.VITE_VOICE_SYNTHESIS_LANG;
  }

  if (import.meta.env.VITE_VOICE_RECOGNITION_TIMEOUT) {
    config.voiceRecognitionTimeout = parseInt(import.meta.env.VITE_VOICE_RECOGNITION_TIMEOUT, 10);
  }

  // Rate limiting
  if (import.meta.env.VITE_RATE_LIMIT_REQUESTS) {
    config.rateLimitRequests = parseInt(import.meta.env.VITE_RATE_LIMIT_REQUESTS, 10);
  }

  if (import.meta.env.VITE_RATE_LIMIT_WINDOW) {
    config.rateLimitWindow = parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW, 10);
  }

  // Logging
  if (import.meta.env.VITE_LOG_LEVEL) {
    config.logLevel = import.meta.env.VITE_LOG_LEVEL as AppConfig['logLevel'];
  }

  if (import.meta.env.VITE_ENABLE_CONSOLE_LOGS !== undefined) {
    config.enableConsoleLogs = import.meta.env.VITE_ENABLE_CONSOLE_LOGS === 'true';
  }

  // Security
  if (import.meta.env.VITE_ENABLE_HTTPS !== undefined) {
    config.enableHttps = import.meta.env.VITE_ENABLE_HTTPS === 'true';
  }

  if (import.meta.env.VITE_CORS_ORIGIN) {
    config.corsOrigin = import.meta.env.VITE_CORS_ORIGIN;
  }

  // Analytics
  if (import.meta.env.VITE_ANALYTICS_ENABLED !== undefined) {
    config.analyticsEnabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';
  }

  if (import.meta.env.VITE_ANALYTICS_KEY) {
    config.analyticsKey = import.meta.env.VITE_ANALYTICS_KEY;
  }

  // Error reporting
  if (import.meta.env.VITE_ERROR_REPORTING_ENABLED !== undefined) {
    config.errorReportingEnabled = import.meta.env.VITE_ERROR_REPORTING_ENABLED === 'true';
  }

  if (import.meta.env.VITE_ERROR_REPORTING_KEY) {
    config.errorReportingKey = import.meta.env.VITE_ERROR_REPORTING_KEY;
  }

  return config;
};

/**
 * Global configuration instance
 */
let globalConfig: AppConfig | null = null;

/**
 * Gets the global configuration instance
 * @returns Application configuration
 */
export const getConfig = (): AppConfig => {
  if (!globalConfig) {
    globalConfig = loadConfig();
  }
  return globalConfig;
};

/**
 * Resets the global configuration (useful for testing)
 */
export const resetConfig = (): void => {
  globalConfig = null;
};

/**
 * Validates the configuration
 * @param config - Configuration to validate
 * @returns Validation result with errors if any
 */
export const validateConfig = (config: AppConfig): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!config.geminiApiKey && config.environment === 'production') {
    errors.push('GEMINI_API_KEY is required in production');
  }

  if (!config.apiBaseUrl) {
    errors.push('API_BASE_URL is required');
  }

  if (config.apiTimeout < 1000) {
    errors.push('API_TIMEOUT must be at least 1000ms');
  }

  if (config.rateLimitRequests < 1) {
    errors.push('RATE_LIMIT_REQUESTS must be at least 1');
  }

  if (config.rateLimitWindow < 1000) {
    errors.push('RATE_LIMIT_WINDOW must be at least 1000ms');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Logs the current configuration (excluding sensitive data)
 */
export const logConfig = (): void => {
  const config = getConfig();
  const safeConfig = {
    ...config,
    geminiApiKey: config.geminiApiKey ? '***' : 'NOT_SET',
    analyticsKey: config.analyticsKey ? '***' : 'NOT_SET',
    errorReportingKey: config.errorReportingKey ? '***' : 'NOT_SET',
  };

  console.log('BNS AI Configuration:', safeConfig);
};
