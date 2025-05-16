import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  username?: string;
  resetPasswordUrl?: string;
}

const baseUrl = process.env.APP_URL;

export function ResetPasswordEmail({
  username,
  resetPasswordUrl,
}: ResetPasswordEmailProps) {
  const previewText = `Halo ${username}, Kami menerima permintaan untuk mengatur ulang kata sandi akun Anda. Klik tombol di bawah ini untuk membuat kata sandi baru:`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]'>
            <Section className='mt-[32px]'>
              <Img
                src={`${baseUrl}/fojb-logo.png`}
                width='68'
                height='77'
                alt='FOJB'
                className='mx-auto my-0'
              />
            </Section>
            <Heading className='mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black'>
              Reset Password
            </Heading>
            <Text className='text-[14px] leading-[24px] text-black'>
              Halo {username},
            </Text>
            <Text className='text-[14px] leading-[24px] text-black'>
              Kami menerima permintaan untuk mengatur ulang kata sandi akun
              Anda. Klik tombol di bawah ini untuk membuat kata sandi baru:
            </Text>
            <Section className='mt-[32px] mb-[32px] text-center'>
              <Button
                className='rounded bg-[#198553] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline'
                href={resetPasswordUrl}
              >
                Reset Password
              </Button>
            </Section>
            <Text className='text-[14px] leading-[24px] text-black'>
              Tautan ini akan kedaluwarsa dalam 60 menit. Abaikan email ini jika
              Anda tidak meminta untuk mengatur ulang password.
            </Text>
            <Text className='text-[14px] leading-[24px] text-black'>
              Salam hangat,
              <br />
              <strong>Forum OSIS Jawa Barat</strong>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
