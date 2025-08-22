import styles from './ToolsCard.module.css';
import { cn } from '@/utils/cn';

interface Tool {
  badge: string;
  name: string;
  app: string;
  type: string;
}

const tools: Tool[] = [
  { badge: 'HC', name: 'Copy Trade', app: 'Tag', type: 'Apalancada' },
  { badge: 'HC', name: 'Señales', app: 'Telegram', type: 'Run' },
  { badge: 'HC', name: 'Pasivos', app: 'Sistema', type: 'Honor' },
  { badge: 'HC', name: 'Referidos', app: 'Red', type: 'Red Global' },
  { badge: 'HC', name: 'Broker', app: 'Tag', type: 'Saldo' },
];

const getDotColorClass = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'honor':
      return styles.dotDanger;
    case 'apalancada':
      return styles.dotWarning;
    default:
      return styles.dotSuccess;
  }
};

export const ToolsCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>HERRAMIENTAS</span>
            <span className={styles.count}>{tools.length}</span>
          </div>

          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Herramienta</span>
              <span>App</span>
              <span>Tipo</span>
            </div>

            <div className={styles.tableBody}>
              {tools.map((tool, index) => (
                <div key={index} className={styles.row}>
                  <div className={styles.toolCell}>
                    <div className={styles.badge}>
                      <span className={styles.badgeText}>{tool.badge}</span>
                    </div>
                    <div className={styles.nameContainer}>
                      <span className={styles.name}>{tool.name}</span>
                    </div>
                  </div>

                  <div className={styles.appCell}>
                    <div className={styles.appContent}>
                      <span className={styles.appText}>{tool.app}</span>
                    </div>
                  </div>

                  <div className={styles.typeCell}>
                    <div className={styles.typeContent}>
                      <div className={cn(styles.dot, getDotColorClass(tool.type))} />
                      <span className={styles.typeText}>{tool.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};