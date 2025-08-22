import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/modules/auth/context/AuthContext';
import LogoWhite from '@/assets/logo-white.svg';
import { Fa7SolidAngleDoubleRight } from '@/components/icons/Fa7SolidAngleDoubleRight';
import { FormRow } from '@/components/ui/Form/FormRow';
import { Input } from '@/components/primitives/Input';
import staffMilitary from '@/assets/military.png';
import { RectBlurCardCSS } from '../RectBlurCardCSS';
import styles from './EmailVerificationForm.module.css';

// Schema de validación para verificación de email
const emailVerificationSchema = z.object({
  email: z.email('Email inválido').min(1, 'El email es requerido'),
  verification_code: z.string().min(6, 'El código debe tener 6 dígitos').max(6, 'El código debe tener 6 dígitos'),
});

type EmailVerificationFormValues = z.infer<typeof emailVerificationSchema>;

interface EmailVerificationFormProps {
  onVerificationSuccess: (email: string, verificationCode: string) => void;
  onBack: () => void;
}

export function EmailVerificationForm({ onVerificationSuccess, onBack }: EmailVerificationFormProps) {
  const { initiateEmailVerification, checkEmailVerification, isSendingCode, isVerifyingCode, error } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailVerificationFormValues>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      email: '',
      verification_code: '',
    },
  });

  const watchedEmail = watch('email');

  const handleSendCode = async () => {
    if (!watchedEmail) {
      return;
    }

    try {
      await initiateEmailVerification(watchedEmail);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data: EmailVerificationFormValues) => {
    try {
      await checkEmailVerification(data.email, data.verification_code);
      onVerificationSuccess(data.email, data.verification_code);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Sección Izquierda */}
      <div className="hidden lg:flex flex-col items-center gap-[40px] flex-1 self-stretch">
        <div className="flex flex-col justify-center items-center gap-[100px] flex-1 self-stretch">
          <div className="flex flex-col items-center gap-[4px]">
            <img src={LogoWhite} alt="Logo" className="w-full max-w-[505px] h-auto aspect-[505/187.06]" />
          </div>
        </div>
      </div>

      {/* Sección Derecha */}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col w-full max-w-[535px] ${styles.container}`}>
        <RectBlurCardCSS className="flex-1">
          {/* Form Wrapper */}
          <div className="absolute inset-0 w-full h-full p-4 md:p-[32px]">
            <div className="flex flex-col items-center w-full h-full rounded-[32px] bg-[rgba(10,15,13,0.70)] backdrop-blur-[4px] overflow">
              {/* Contenedor de imagen militar */}
              <div className="flex w-full flex-[1_0_0] items-center justify-center">
                <div className="absolute top-[-120px] right-4 hidden md:flex w-full px-3 md:px-[12px] pt-12 md:pt-[48px] pb-[60px] flex-col items-start flex-1 z-2">
                  <img
                    src={staffMilitary}
                    alt="Staff Military"
                    className={`w-full h-auto object-contain max-h-[200px] lg:max-h-none ${styles.fadeBottom}`}
                  />
                </div>
              </div>

              {/* Contenedor principal del form */}
              <div className="flex w-full p-6 xl:py-[48px] [@media(max-height:954px)]:py-[12px] flex-col items-center gap-6 md:gap-8 rounded-[32px] bg-cards z-3">
                {/* Espaciador */}
                <div className="flex flex-col items-start gap-4 md:gap-6 [@media(max-height:954px)]:gap-[8px] w-full">
                  {error && (
                    <div className="mb-4 p-3 text-red-500 bg-red-100 rounded-md transition-all duration-200 ease-in-out animate-fadeIn">
                      {error.message}
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex w-full pb-4 md:pb-[32px] [@media(max-height:954px)]:pb-[6px] flex-col justify-center items-center gap-2 md:gap-[4px]">
                    <h1 className="text-primary-light font-valkocapela text-2xl md:text-[28px] font-normal">
                      CONFIRMA TU CORREO
                    </h1>
                    <p className="text-secondary-light font-montserrat text-xs md:text-[14px] font-normal text-center">
                      Debes validar tu correo con el código de 6 dígitos que te enviaremos para continuar con el registro
                    </p>
                  </div>

                  {/* Contenedor de inputs */}
                  <div className="flex flex-col items-end gap-4 md:gap-[16px] pb-4 md:pb-[32px] w-full">
                    <FormRow label="Email" required error={errors.email?.message} className="w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <Input
                          type="email"
                          placeholder="Ingresa tu email"
                          {...register('email')}
                          className="w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                          disabled={isSendingCode || isVerifyingCode}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleSendCode}
                            disabled={isSendingCode || isVerifyingCode || !watchedEmail}
                            className="px-4 py-2 bg-[#0e2016] border border-[rgba(144,255,180,0.16)] text-[#cfead7] rounded-lg text-sm whitespace-nowrap transition-all duration-200 ease-in-out hover:bg-[#132a1d] hover:border-[rgba(144,255,180,0.3)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSendingCode ? 'Enviando código...' : 'Enviar código de verificación'}
                          </button>
                        </div>
                      </div>
                    </FormRow>

                    <FormRow label="Código de verificación" required error={errors.verification_code?.message} className="w-full">
                      <Input
                        type="text"
                        placeholder="Código de 6 dígitos"
                        {...register('verification_code')}
                        className="w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                        disabled={isSendingCode || isVerifyingCode}
                        maxLength={6}
                      />
                    </FormRow>
                  </div>

                  {/* Link para volver */}
                  <div className="flex justify-center w-full">
                    <button
                      type="button"
                      onClick={onBack}
                      className="text-secondary-light hover:text-primary-light text-sm transition-all duration-200 ease-in-out hover:scale-105"
                    >
                      ← Volver al login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RectBlurCardCSS>
        
        {/* Botón de verificar */}
        <div className="flex pt-[24px] flex-col items-start gap-[10px] self-stretch">
          <button
            type="submit"
            disabled={isSendingCode || isVerifyingCode}
            className={`flex justify-center items-center gap-2 self-stretch rounded-[32px] bg-primary transition-all duration-200 ease-in-out ${
              isSendingCode || isVerifyingCode ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90 active:scale-95'
            } ${styles.button}`}
          >
            <span className="text-background text-center font-valkocapela text-base md:text-xl font-normal uppercase">
              {isVerifyingCode ? 'Verificando...' : 'VERIFICAR'}
            </span>
            <Fa7SolidAngleDoubleRight fill="black" width={20} height={20} />
          </button>
        </div>
      </form>
    </>
  );
}
