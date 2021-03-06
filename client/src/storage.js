const __TASKS_DONE_KEY__ = 'checklist:tasks:done';
const __PROJECTS_KEY__ = 'checklist:projects';

export function clearDoneTasks(current_project) {
  localStorage.removeItem(`${__TASKS_DONE_KEY__}:${current_project}`);
}

export function saveDoneTasks(current_project, saved_tasks) {
  localStorage.setItem(`${__TASKS_DONE_KEY__}:${current_project}`, JSON.stringify([...saved_tasks]));
}

export function getDoneTasks(current_project) {
  return JSON.parse(localStorage.getItem(`${__TASKS_DONE_KEY__}:${current_project}`));
}

export function getProjects() {
  const saved_projects = JSON.parse(localStorage.getItem(__PROJECTS_KEY__));
  return saved_projects || [];
}

export function saveProject(project) {
  const saved_projects = new Set(getProjects());

  saved_projects.add(project);

  localStorage.setItem(__PROJECTS_KEY__, JSON.stringify([...saved_projects]));
}

export function removeProject(project) {
  const saved_projects = new Set(getProjects());
  saved_projects.delete(project);

  localStorage.setItem(__PROJECTS_KEY__, JSON.stringify([...saved_projects]));
  clearDoneTasks(project);
}
