'use client';
import { useMutation } from '@tanstack/react-query';
export const useUpload = () => {
  const uploadFn = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    return response;
  };
  return useMutation({
    mutationFn: uploadFn,
  });
};
