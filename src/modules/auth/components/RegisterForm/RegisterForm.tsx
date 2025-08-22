import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/modules/auth/context/AuthContext';
import LogoWhite from '@/assets/logo-white.svg';
import { Fa7SolidAngleDoubleRight } from '@/components/icons/Fa7SolidAngleDoubleRight';
import { FormRow } from '@/components/ui/Form/FormRow';
import { Input } from '@/components/primitives/Input';
import { RectBlurCardCSS } from '../RectBlurCardCSS';
import { EmailVerificationForm } from '../EmailVerificationForm/EmailVerificationForm';
import styles from './RegisterForm.module.css';

// Schema de validación para registro
const registerSchema = z.object({
  firstname: z.string().min(1, 'El nombre es requerido').min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastname: z.string().min(1, 'El apellido es requerido').min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  referred_by: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser, isRegistering, error } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<'verification' | 'registration'>('verification');
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phone: '',
      password: '',
      confirmPassword: '',
      referred_by: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(
        data.firstname,
        data.lastname,
        data.phone,
        verificationCode,
        data.referred_by || undefined,
        verifiedEmail,
        data.password
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
  };

  const handleVerificationSuccess = (email: string, code: string) => {
    setVerifiedEmail(email);
    setVerificationCode(code);
    setCurrentStep('registration');
  };

  const handleBackToLogin = () => {
    navigate('/auth/login');
  };

  // Si está en el paso de verificación, mostrar EmailVerificationForm
  if (currentStep === 'verification') {
    return (
      <EmailVerificationForm
        onVerificationSuccess={handleVerificationSuccess}
        onBack={handleBackToLogin}
      />
    );
  }

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
              {/* Contenedor principal del form */}
              <div className="flex w-full p-6 xl:py-[48px] [@media(max-height:954px)]:py-[12px] flex-col items-center gap-6 md:gap-8 rounded-[32px] bg-cards z-3">
                {/* Espaciador */}
                <div className="flex flex-col items-start gap-4 md:gap-6 [@media(max-height:954px)]:gap-[8px] w-full">
                  {/* Header */}
                  <div className="flex w-full pb-4 md:pb-[32px] [@media(max-height:954px)]:pb-[6px] flex-col justify-center items-center gap-2 md:gap-[4px]">
                    <h1 className="text-primary-light font-valkocapela text-2xl md:text-[28px] font-normal">
                      COMPLETA TU REGISTRO
                    </h1>
                  </div>

                  {/* Contenedor de inputs */}
                  <div className="flex flex-col items-end gap-4 md:gap-[16px] md:pb-[16px] w-full">
                    <FormRow label="Nombre" required error={errors.firstname?.message} className="w-full">
                      <Input
                        type="text"
                        placeholder="Ingresa tu nombre"
                        {...register('firstname')}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>

                    <FormRow label="Apellido" required error={errors.lastname?.message} className="w-full">
                      <Input
                        type="text"
                        placeholder="Ingresa tu apellido"
                        {...register('lastname')}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>

                    <FormRow label="Teléfono" required error={errors.phone?.message} className="w-full">
                      <Input
                        type="tel"
                        placeholder="Ingresa tu teléfono"
                        {...register('phone')}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>

                    <FormRow label="Código de referido" error={errors.referred_by?.message} className="w-full">
                      <Input
                        type="text"
                        placeholder="Código de referido (opcional)"
                        {...register('referred_by')}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>

                    <FormRow label="Contraseña" required error={errors.password?.message} className="w-full">
                      <Input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        {...register('password')}
                        canShowPassword={true}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>

                    <FormRow label="Confirmar Contraseña" required error={errors.confirmPassword?.message} className="w-full">
                      <Input
                        type="password"
                        placeholder="Confirma tu contraseña"
                        {...register('confirmPassword')}
                        canShowPassword={true}
                        className="w-full"
                        disabled={isRegistering}
                      />
                    </FormRow>
                  </div>

                  {/* Link para ir al login */}
                  <div className="flex justify-center w-full">
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="text-secondary-light hover:text-primary-light text-sm transition-colors"
                    >
                      ¿Ya tienes cuenta? Inicia sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RectBlurCardCSS>
        {/* Botón de registro */}
        <div className="flex pt-[24px] flex-col items-start gap-[10px] self-stretch">
          <button
            type="submit"
            disabled={isRegistering}
            onClick={handleSubmit(onSubmit)}
            className={`flex justify-center items-center gap-2 self-stretch rounded-[32px] bg-primary transition-all duration-200 ease-in-out ${
              isRegistering ? 'opacity-70' : 'cursor-pointer hover:opacity-90 active:scale-95'
            } ${styles.button}`}
          >
            <span className="text-background text-center font-valkocapela text-base md:text-xl font-normal uppercase">
              {isRegistering ? 'Registrando...' : 'Completar Registro'}
            </span>
            <Fa7SolidAngleDoubleRight fill="black" width={20} height={20} />
          </button>
        </div>
      </form>
    </>
  );
}
