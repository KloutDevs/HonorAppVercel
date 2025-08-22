import styles from './ContentSummary.module.css';
import { OnlineClasses } from './components/OnlineClasses/OnlineClasses';
import { ToolsCard } from './components/ToolsCard/ToolsCard';
import { MetricsCard } from './components/MetricsCard/MetricsCard';

export const ContentSummary = () => {
  return (
    <div className={styles.container}>
      <div className={styles.toolsAndMetrics}>
        <ToolsCard />
        <MetricsCard />
      </div>
      <OnlineClasses />
    </div>
  );
};