import { useState } from 'react';
import { Button, StatefulButton } from '@/components/primitives/Buttons';
import styles from '@/modules/test/styles/Buttons.module.css';
import { cn } from '@/utils/cn';
import { Header } from '@/modules/test/components/Header/Header';

export default function TestButtons() {
  const [loading, setLoading] = useState(true);

  const handleAsyncClick = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Header title="Test Buttons" />

      <div className={styles.content}>
        {/* Botones Normales */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Button Variants</h2>
          <div className={styles.grid}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button variant="success">Success Button</Button>
            <Button variant="warning">Warning Button</Button>
            <Button variant="info">Info Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="transparent">Transparent Button</Button>
          </div>
        </section>

        {/* Tamaños de Botones */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Button Sizes</h2>
          <div className={styles.grid}>
            <Button variant="primary" size="sm">
              Small Button
            </Button>
            <Button variant="primary" size="md">
              Medium Button
            </Button>
            <Button variant="primary" size="lg">
              Large Button
            </Button>
          </div>
        </section>

        {/* Estados de Botones */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Button States</h2>
          <div className={styles.grid}>
            <Button variant="primary" disabled>
              Disabled Button
            </Button>
            <Button variant="primary" onClick={handleAsyncClick}>
              Loading Button
            </Button>
          </div>
        </section>

        {/* Botones con Estado (StatefulButton) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stateful Buttons</h2>
          <div className={styles.grid}>
            <StatefulButton
              variant="primary"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Primary Stateful
            </StatefulButton>

            <StatefulButton
              variant="success"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Success Stateful
            </StatefulButton>

            <StatefulButton
              variant="outline"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Outline Stateful
            </StatefulButton>
          </div>
        </section>

        {/* Botones con Iconos */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Buttons with Icons</h2>
          <div className={styles.grid}>
            <Button variant="primary">
              <IconPlus className="w-4 h-4" />
              Add Item
            </Button>

            <Button variant="danger">
              <IconTrash className="w-4 h-4" />
              Delete
            </Button>

            <Button variant="success">
              <IconCheck className="w-4 h-4" />
              Confirm
            </Button>
          </div>
        </section>

        {/* Botones de Ancho Completo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Full Width Buttons</h2>
          <div className={styles.fullWidth}>
            <Button variant="primary" className="w-full">
              Full Width Button
            </Button>

            <StatefulButton
              variant="outline"
              className="w-full"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Full Width Stateful
            </StatefulButton>
          </div>
        </section>

        {/* Botones con Estado (StatefulButton) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stateful Buttons</h2>
          <div className={styles.grid}>
            {/* Ejemplo básico */}
            <StatefulButton
              variant="primary"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Basic Stateful
            </StatefulButton>

            {/* Con manejo de eventos */}
            <StatefulButton
              variant="success"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
              onLoadingChange={(isLoading) => console.log('Loading:', isLoading)}
              onSuccess={() => console.log('Success!')}
              onError={() => console.log('Error!')}
            >
              With Events
            </StatefulButton>

            {/* Con error forzado */}
            <StatefulButton
              variant="danger"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                throw new Error('Forced error');
              }}
            >
              Force Error
            </StatefulButton>

            {/* Con estados controlados */}
            <StatefulButton
              variant="warning"
              forceLoading={loading}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Controlled Loading
            </StatefulButton>

            <StatefulButton
              variant="info"
              forceSuccess={true}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Force Success
            </StatefulButton>

            <StatefulButton
              variant="outline"
              forceError={true}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 2000));
              }}
            >
              Force Error State
            </StatefulButton>
          </div>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Advanced Button States</h2>
          <div className={styles.grid}>
            {/* Loading con duración exacta */}
            <StatefulButton
              variant="primary"
              loadingDuration={2000}
              loadingText="Loading..."
              onClick={async () => {
                // El loading durará exactamente 2 segundos
                console.log('Action completed');
              }}
            >
              Exact Duration
            </StatefulButton>

            {/* Success inmediato sin loading */}
            <StatefulButton
              variant="success"
              skipLoading={true}
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 500));
              }}
            >
              Direct Success
            </StatefulButton>

            {/* Error inmediato sin loading */}
            <StatefulButton
              variant="danger"
              skipLoading={true}
              onClick={async () => {
                throw new Error('Forced error');
              }}
            >
              Direct Error
            </StatefulButton>

            {/* Loading controlado */}
            <StatefulButton
              variant="info"
              loadingDuration={3000}
              loadingText="Processing..."
              onClick={async () => {
                // El loading durará 3 segundos exactos,
                // independiente de cuánto tarde esta operación
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
            >
              Controlled Loading
            </StatefulButton>
          </div>
        </section>
      </div>
    </div>
  );
}

// Componentes de iconos de ejemplo
const IconPlus = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const IconTrash = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path
      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M19 12H5m7 7l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
