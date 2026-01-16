-- BLOOMVIEW CONSULTS DATABASE SCHEMA
-- Create the database
CREATE DATABASE IF NOT EXISTS bloomview_db;
USE bloomview_db;

-- Table for Contact Inquiries (Leads)
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'contacted', 'resolved') DEFAULT 'new',
    timestamp BIGINT NOT NULL
);

-- Table for Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);