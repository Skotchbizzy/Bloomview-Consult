-- BLOOMVIEW ANALYTICS SCHEMA (CLICKHOUSE)
-- Create the analytics database
CREATE DATABASE IF NOT EXISTS bloomview_analytics;

-- Use the database
USE bloomview_analytics;

-- Table for tracking lead events (Mirrored from MySQL)
-- Optimized for high-speed aggregations
CREATE TABLE IF NOT EXISTS lead_events (
    event_id String,
    name String,
    email String,
    service String,
    timestamp DateTime
) 
ENGINE = MergeTree()
ORDER BY (service, timestamp);

-- Example: Add a table for page views if needed later
CREATE TABLE IF NOT EXISTS page_views (
    url String,
    referrer String,
    user_agent String,
    timestamp DateTime
)
ENGINE = MergeTree()
ORDER BY timestamp;