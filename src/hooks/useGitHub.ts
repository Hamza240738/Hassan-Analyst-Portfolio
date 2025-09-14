import { useState, useEffect } from 'react';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  location: string;
  company: string;
  blog: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage: string;
}

export const useGitHub = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`
        );
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  // Get top repositories by stars and activity
  const featuredRepos = repos
    .filter(repo => !repo.name.includes(username)) // Exclude profile README repo
    .sort((a, b) => {
      const scoreA = a.stargazers_count * 2 + a.forks_count;
      const scoreB = b.stargazers_count * 2 + b.forks_count;
      return scoreB - scoreA;
    })
    .slice(0, 6);

  // Extract technologies from repositories with intelligent parsing
  const extractedLanguages = repos
    .map(repo => repo.language)
    .filter(lang => lang !== null);
    
  const extractedTopics = repos.flatMap(repo => repo.topics);
  
  // Extract skills from repository names and descriptions
  const extractedFromContent = repos.flatMap(repo => {
    const content = `${repo.name} ${repo.description || ''}`.toLowerCase();
    const skills = [];
    
    // Data analysis tools
    if (content.includes('excel') || content.includes('sales-analysis') || content.includes('dashboard')) skills.push('Excel', 'Data Analysis');
    if (content.includes('power bi') || content.includes('powerbi')) skills.push('Power BI');
    if (content.includes('tableau')) skills.push('Tableau');
    if (content.includes('python') || content.includes('jupyter') || content.includes('pandas')) skills.push('Python');
    if (content.includes('sql') || content.includes('database')) skills.push('SQL');
    if (content.includes('data science') || content.includes('data-science')) skills.push('Data Science');
    if (content.includes('machine learning') || content.includes('ml')) skills.push('Machine Learning');
    if (content.includes('visualization') || content.includes('dashboard')) skills.push('Data Visualization');
    if (content.includes('analytics') || content.includes('analysis')) skills.push('Business Analytics');
    if (content.includes('survey') || content.includes('statistics')) skills.push('Statistical Analysis');
    
    return skills;
  });

  // Combine and deduplicate technologies
  let technologies = Array.from(new Set([
    ...extractedLanguages,
    ...extractedTopics,
    ...extractedFromContent
  ]));

  // Enhance based on user bio and repository patterns
  if (user?.bio?.includes('data analytics') || repos.some(repo => repo.name.includes('Analysis'))) {
    const dataSkills = ['Data Analysis', 'Business Intelligence', 'Data Visualization', 'Statistical Analysis'];
    technologies = Array.from(new Set([...technologies, ...dataSkills]));
  }

  if (user?.bio?.includes('biotech') || user?.bio?.includes('biological systems')) {
    technologies.push('Bioinformatics', 'Research Analysis');
  }

  technologies = technologies.slice(0, 12);

  return {
    user,
    repos,
    featuredRepos,
    technologies,
    loading,
    error,
  };
};