DROP TABLE IF EXISTS users_activities;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS courses;

CREATE TABLE IF NOT EXISTS courses (
    id serial primary key not null,
    name text not null,
    code text not null,
    created_at timestamptz default now(),
    deleted_at timestamptz null
);

CREATE TABLE IF NOT EXISTS users (
  id serial primary key not null,
  course_id INT4 REFERENCES courses(id) null,
  name text not null,
  password text not null,
  email text not null,
  token text null,
  is_logged boolean default false,
  is_coordinator boolean default false,
  registration text null,
  created_at timestamptz default now(),
  deleted_at timestamptz null
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    hours_added INT4 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL
);

CREATE TABLE IF NOT EXISTS users_activities (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT4 REFERENCES users(id),
    activity_id INT4 REFERENCES activities(id),
    quantity INT4 DEFAULT 0,
    total_hours INT4 DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ NULL
);