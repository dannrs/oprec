'use client';
import { useForm } from 'react-hook-form';
import { useUpload } from '@/hooks/use-upload';
import { toast } from 'sonner';

type UploadData = {
  file: FileList;
};

export default function UploadForm() {
  const { register, handleSubmit } = useForm<UploadData>();
  const { mutate: upload, isPending } = useUpload();

  const onSubmit = (data: UploadData) => {
    if (!data.file?.[0]) return;
    upload(data.file[0], {
      onSuccess: (response) => {
        if (response.status === 200) {
          toast.success('Upload successful');
        } else {
          toast.error('Upload failed');
        }
      },
      onError: () => {
        toast.error('Upload failed');
      },
    });
  };
  return isPending ? (
    <div>Uploading...</div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4 flex flex-col gap-2'>
        <label htmlFor='file'>Picture</label>
        <input
          {...register('file')}
          type='file'
          accept='image/*'
          className='cursor-pointer rounded-md border border-gray-300 bg-gray-100 p-2'
        />
      </div>
      <button type='submit' className='rounded-md bg-blue-500 p-2 text-white'>
        Upload
      </button>
    </form>
  );
}
