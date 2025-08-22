import styles from './MetricsCard.module.css';

interface KpiProps {
    label: string;
    value: string;
}

const Kpi = ({ label, value }: KpiProps) => (
    <div className={styles.kpi}>
        <div className={styles.kpiInner}>
            <div className={styles.kpiContent}>
                <span className={styles.kpiLabel}>{label}</span>
                <span className={styles.kpiValue}>{value}</span>
            </div>
        </div>
    </div>
);

const GraphComponent = () => (
    <div className={styles.graph}>
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="102" viewBox="0 0 400 102" fill="none">
            <path d="M1 101C10.95 78.844 22.3699 59.9346 37.1818 56.0512C51.9937 52.1678 56.7992 83.8723 73.3636 78.844C89.9281 73.8156 96.8253 16.4392 109.545 12.1636C122.266 7.88797 130.633 36.8654 145.727 35.1686C160.822 33.4718 166.928 -5.09859 181.909 3.5325C196.891 12.1636 202.601 51.6447 218.091 56.3342C233.581 61.0237 240.761 34.6713 254.273 37.5156C267.784 40.3598 275.19 72.392 290.455 69.6599C305.719 66.9277 311.485 7.4953 326.636 21.3319C341.787 35.1686 344.671 104.319 362.818 99.3995C380.966 94.4795 391.537 35.1686 399 1" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    </div>
);

export const MetricsCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.tradesMetrics}>
                <div className={styles.kpiContainer}>
                    <Kpi label="Trade Tomados" value="54 Trades" />
                    <Kpi label="Trade Ganados" value="52 Ganados" />
                    <Kpi label="Trade Perdidos" value="2 Perdidos" />
                </div>
                <div className={styles.graphContainer}>
                    <span className={styles.graphTitle}>Estadística</span>
                    <div className={styles.graphWrapper}>
                        <GraphComponent />
                    </div>
                </div>
            </div>
            <div className={styles.goalsMetrics}>
                <div className={styles.goalsHeader}>
                    <span className={styles.goalsTitle}>Métricas y Metas</span>
                    <span className={styles.goalsMonths}>7 meses</span>
                </div>
                <div className={styles.goalsBody}>
                    <span className={styles.goalsPercentage}>89%</span>
                </div>
                <div className={styles.goalsFooter}>
                    <span className={styles.footerText}>Rentabilidad Mensual/Anual</span>
                    <div className={styles.dot} />
                    <span className={styles.footerText}>+5 new this month</span>
                    <div className={styles.dot} />
                    <span className={styles.footerText}>top 5 for connections</span>
                </div>
            </div>
        </div>
    );
};