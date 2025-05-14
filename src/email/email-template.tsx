import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface VerifyEmailProps {
  username?: string;
  verificationUrl?: string;
}

const baseUrl = process.env.APP_URL;

export function VerifyEmail({ username, verificationUrl }: VerifyEmailProps) {
  const previewText = `Halo ${username}, Terima kasih telah mendaftar! Untuk menyelesaikan proses pendaftaran, silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:`;

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
              Verifikasi Alamat Email Anda
            </Heading>
            <Text className='text-[14px] leading-[24px] text-black'>
              Halo {username},
            </Text>
            <Text className='text-[14px] leading-[24px] text-black'>
              Terima kasih telah mendaftar! Untuk menyelesaikan proses
              pendaftaran, silakan verifikasi alamat email Anda dengan mengklik
              tombol di bawah ini:
            </Text>
            <Section className='mt-[32px] mb-[32px] text-center'>
              <Button
                className='rounded bg-[#198553] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline'
                href={verificationUrl}
              >
                Verifikasi Email
              </Button>
            </Section>
            <Text className='text-[14px] leading-[24px] text-black'>
              Jika tombol di atas tidak berfungsi, silakan copy dan paste tautan
              berikut ke browser Anda:
              <br />
              <Link
                href={verificationUrl}
                className='text-blue-600 no-underline'
              >
                {verificationUrl}
              </Link>
            </Text>
            <Text className='text-[14px] leading-[24px] text-black'>
              Abaikan email ini jika Anda tidak pernah membuat akun.
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
