import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { techMap } from '@/constants/techMap';

export const techDescriptionMap: { [key: string]: string } = {
  javascript:
    'JavaScript is a powerful language for building dynamic, interactive, and modern web applications.',
  typescript:
    'TypeScript adds strong typing to JavaScript, making it great for scalable and maintainable applications.',
  react:
    'React is a popular library for building fast and modular user interfaces.',
  nextjs:
    'Next.js is a React framework for server-side rendering and building optimized web applications.',
  nodejs:
    'Node.js enables server-side JavaScript, allowing you to create fast, scalable network applications.',
  python:
    'Python is a versatile language known for readability and a vast ecosystem, often used for data science and automation.',
  java: 'Java is an object-oriented language commonly used for enterprise applications and Android development.',
  cplusplus:
    'C++ is a high-performance language suitable for system software, game engines, and complex applications.',
  git: 'Git is a version control system that tracks changes in source code during software development.',
  docker:
    'Docker is a container platform that simplifies application deployment and environment management.',
  mongodb:
    'MongoDB is a NoSQL database for handling large volumes of flexible, document-based data.',
  mysql:
    'MySQL is a popular relational database, known for reliability and ease of use.',
  postgresql:
    'PostgreSQL is a robust open-source relational database with advanced features and strong SQL compliance.',
  aws: 'AWS is a comprehensive cloud platform offering a wide range of services for deployment, storage, and more.',
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTechDescription = (techName: string) => {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? techDescriptionMap[normalizedTechName]
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export const getDevIconClassName = (techName: string) => {
  const normalizeName = techName.replace(/[ .]/g, '').toLowerCase();

  return techMap[normalizeName]
    ? `${techMap[normalizeName]} colored`
    : 'devicon-javascript-plain';
};

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

export const formatLocalTime = (utcString?: string): string => {
  if (!utcString) return 'Invalid Date'; // Handle undefined case gracefully
  return new Date(utcString).toLocaleString();
};

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

const stop_duration = (dateStr: string): string => {
  const updateTime = new Date(dateStr);
  const currentDate = new Date();
  const diff = Math.floor(
    (currentDate.getTime() - updateTime.getTime()) / 1000
  );

  let min: number = 0;
  let sec: number = 0;
  let hr: number = 0;
  let day: number = 0;

  if (diff <= 30) {
    return 'RUNNING';
  } else if (diff > 30 && diff < 60) {
    return diff + ' seconds ago';
  } else if (diff > 60 && diff < 3600) {
    min = Math.floor(diff / 60);
    sec = diff % 60;
    return min + ' min ' + sec + ' secs ago';
  } else if (diff > 3600 && diff < 3600 * 24) {
    hr = Math.floor(diff / 3600);
    const rem = diff % 3600;
    min = Math.floor(rem / 60);
    sec = rem % 60;
    return hr + ' hrs ' + min + ' min ' + sec + ' secs ago';
  } else {
    day = Math.floor(diff / (3600 * 24));
    const hrRem = diff % (3600 * 24);
    hr = Math.floor(hrRem / 3600);
    const rem = hrRem % 3600;
    min = Math.floor(rem / 60);
    sec = rem % 60;
    return day + ' days ' + hr + ' hrs ' + min + ' min ' + sec + ' secs ago';
  }

  // return diff
};

export const getStopDuration = (geo: Geo): string => {
  const time = () => {
    if (geo.active_time) {
      return geo.active_time;
    } else {
      return geo.update_time;
    }
  };

  const t = time();

  return t ? stop_duration(t) : 'undefined';
};

export const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Buffer.from(hashBuffer).toString('hex');
};

export const verifyPassword = async (
  enteredPassword: string,
  hashedPassword: string
) => {
  const hashedEnteredPassword = await hashPassword(enteredPassword);
  return hashedEnteredPassword === hashedPassword;
};

// async function verifyPassword(enteredPassword: string, hashedPassword: string) {
//   const hashedEnteredPassword = await hashPassword(enteredPassword);
//   return hashedEnteredPassword === hashedPassword;
// }
