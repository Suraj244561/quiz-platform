import { loginCms, loginStudent } from '../services/quizService.js';
import { pickUser } from '../utils/helpers.js';

export function cmsLogin(req, res) {
  const { username, password } = req.body;
  const user = loginCms(username, password);
  if (!user) return res.status(401).json({ message: 'Incorrect username/password' });
  return res.json({ user: pickUser(user) });
}

export function studentLogin(req, res) {
  const { username, password } = req.body;
  const user = loginStudent(username, password);
  if (!user) return res.status(401).json({ message: 'Incorrect username/password' });
  return res.json({ user: pickUser(user) });
}
