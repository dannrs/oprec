import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';

type InputPasswordProps = React.ComponentProps<typeof Input>;

export function InputPassword({ ...props }: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        {...props}
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder || 'Password'}
      />
      {showPassword ? (
        <Eye
          className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <EyeClosed
          className='absolute top-1/2 right-2 size-4 -translate-y-1/2 cursor-pointer'
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
}
