import { toaster } from '../components/ui/toaster';

export const Status = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
});

export function showToaster(status, title, description) {
  toaster.create({
    title: title,
    description: description,
    type: status,
    closable: true,
  });
}
