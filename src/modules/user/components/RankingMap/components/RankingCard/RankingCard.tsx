import styles from './RakingCard.module.css';
import { AsyncImage } from '@/components/ui/AsyncImage/AsyncImage';

interface LeaderboardItem {
  position: number;
  avatar: string;
  username: string;
  rank: string;
  lastActive: string;
  direction: 'up' | 'down';
}

const mockLeaderboard: LeaderboardItem[] = [
  {
    position: 1,
    avatar: "https://picsum.photos/40/40?random=1",
    username: "Sarah Connor",
    rank: "Master Trader",
    lastActive: "5 mins ago",
    direction: 'up'
  },
  {
    position: 2,
    avatar: "https://picsum.photos/40/40?random=2",
    username: "John Smith",
    rank: "Elite Trader",
    lastActive: "10 mins ago",
    direction: 'down'
  },
  {
    position: 3,
    avatar: "https://picsum.photos/40/40?random=3",
    username: "Maria García",
    rank: "Pro Trader",
    lastActive: "15 mins ago",
    direction: 'up'
  },
  {
    position: 4,
    avatar: "https://picsum.photos/40/40?random=4",
    username: "Alex Johnson",
    rank: "Senior Trader",
    lastActive: "20 mins ago",
    direction: 'down'
  },
  {
    position: 5,
    avatar: "https://picsum.photos/40/40?random=5",
    username: "Emma Wilson",
    rank: "Expert Trader",
    lastActive: "25 mins ago",
    direction: 'up'
  },
  {
    position: 6,
    avatar: "https://picsum.photos/40/40?random=6",
    username: "Carlos Ruiz",
    rank: "Advanced Trader",
    lastActive: "30 mins ago",
    direction: 'up'
  },
  {
    position: 7,
    avatar: "https://picsum.photos/40/40?random=7",
    username: "Sophie Martin",
    rank: "Master Trader",
    lastActive: "35 mins ago",
    direction: 'down'
  },
  {
    position: 8,
    avatar: "https://picsum.photos/40/40?random=8",
    username: "David Lee",
    rank: "Elite Trader",
    lastActive: "40 mins ago",
    direction: 'down'
  },
  {
    position: 9,
    avatar: "https://picsum.photos/40/40?random=9",
    username: "Laura Brown",
    rank: "Pro Trader",
    lastActive: "45 mins ago",
    direction: 'up'
  },
  {
    position: 10,
    avatar: "https://picsum.photos/40/40?random=10",
    username: "Michael Chen",
    rank: "Senior Trader",
    lastActive: "50 mins ago",
    direction: 'down'
  },
  {
    position: 11,
    avatar: "https://picsum.photos/40/40?random=11",
    username: "Ana Silva",
    rank: "Expert Trader",
    lastActive: "55 mins ago",
    direction: 'up'
  },
  {
    position: 12,
    avatar: "https://picsum.photos/40/40?random=12",
    username: "Thomas Wright",
    rank: "Advanced Trader",
    lastActive: "1 hour ago",
    direction: 'up'
  },
  {
    position: 13,
    avatar: "https://picsum.photos/40/40?random=13",
    username: "Isabella Kim",
    rank: "Master Trader",
    lastActive: "1 hour ago",
    direction: 'up'
  },
  {
    position: 14,
    avatar: "https://picsum.photos/40/40?random=14",
    username: "Lucas Martinez",
    rank: "Elite Trader",
    lastActive: "1 hour ago",
    direction: 'up'
  },
  {
    position: 15,
    avatar: "https://picsum.photos/40/40?random=15",
    username: "Olivia Taylor",
    rank: "Pro Trader",
    lastActive: "1 hour ago",
    direction: 'up'
  }
];

const ArrowIndicator = ({ direction }: { direction: 'up' | 'down' }) => (
  direction === 'up' ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="35" viewBox="0 0 39 35" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.648 20.3763C26.1759 20.7912 25.4103 20.7912 24.9382 20.3763L19.3448 15.4609L13.7515 20.3763C13.2793 20.7912 12.5138 20.7912 12.0416 20.3763C11.5695 19.9613 11.5695 19.2886 12.0416 18.8737L18.4899 13.207C18.9621 12.7921 19.7276 12.7921 20.1998 13.207L26.648 18.8737C27.1202 19.2886 27.1202 19.9613 26.648 20.3763Z" fill="#4BFF53" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="39" height="35" viewBox="0 0 39 35" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0417 14.6237C12.5138 14.2088 13.2794 14.2088 13.7515 14.6237L19.3449 19.5391L24.9382 14.6237C25.4104 14.2088 26.1759 14.2088 26.6481 14.6237C27.1202 15.0387 27.1202 15.7114 26.6481 16.1263L20.1998 21.793C19.7276 22.2079 18.9621 22.2079 18.4899 21.793L12.0417 16.1263C11.5695 15.7114 11.5695 15.0387 12.0417 14.6237Z" fill="#F95959" />
    </svg>
  )
);


const LeaderboardItem = ({ position, avatar, username, rank, lastActive, direction }: LeaderboardItem) => (
  <div className={styles.leaderboardItem}>
    <div className={styles.innerContainer}>
      <div className={styles.positionSection}>
        <div className={styles.arrowContainer}>
          <ArrowIndicator direction={direction} />
        </div>
        <div className={styles.positionContainer}>
          <span className={styles.positionText}>{position}</span>
        </div>
      </div>

      <div className={styles.avatarSection}>
        <AsyncImage
          src={avatar}
          alt={username}
          width={40}
          height={40}
          className={styles.avatarImage}
          showPlaceholder={true}
          fallbackText=""
        />
      </div>

      <div className={styles.textSection}>
        <span className={styles.username}>{username}</span>
        <span className={styles.rankLabel}>{rank}</span>
      </div>

      <div className={styles.timeSection}>
        <span className={styles.timeText}>{lastActive}</span>
      </div>
    </div>
  </div>
);

export const RankingCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Top Ranking Global</span>
        <span className={styles.count}>2K</span>
      </div>
      <div className={styles.leaderboard}>
        <div className={styles.leaderboardList}>
          {mockLeaderboard.map((item, index) => (
            <LeaderboardItem key={index} {...item} />
          ))}
        </div>
      </div>
      <button className={styles.button}>
        <span className={styles.buttonText}>Invitar</span>
      </button>
    </div>
  );
};