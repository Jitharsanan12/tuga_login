import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { keyframes } from '@mui/material/styles';
import illustration from '../assets/illustration.svg';

type TaskCardData = { title: string; tasks: number; percent: number; tag: string };
type BoyMood = 'laugh' | 'smile' | 'think';
type GirlMood = 'surprised' | 'smile' | 'happy';
type Slide = {
  caption: string;
  card: TaskCardData;
  moods: { boy: BoyMood; girl: GirlMood };
};

const SLIDES: Slide[] = [
  {
    caption: 'Plan every day with less stress',
    card: { title: 'Team Sync', tasks: 5, percent: 62, tag: 'Meeting' },
    moods: { boy: 'smile', girl: 'smile' },
  },
  {
    caption: 'Track progress and stay on schedule',
    card: { title: 'Sprint Review', tasks: 8, percent: 40, tag: 'Dev' },
    moods: { boy: 'think', girl: 'happy' },
  },
  {
    caption: 'Make your work easier and organized',
    card: { title: 'Canva Design', tasks: 10, percent: 84, tag: 'Design' },
    moods: { boy: 'laugh', girl: 'surprised' },
  },
];


const DESIGN_SLIDE = 2;

const avatarSize = { md: 56, lg: 72 };

// Avatar animations
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;
const hop = keyframes`
  0% { transform: translateY(0) scale(1); }
  35% { transform: translateY(-14px) scale(1.06); }
  65% { transform: translateY(0) scale(0.97); }
  100% { transform: translateY(0) scale(1); }
`;
const blink = keyframes`
  0%, 92%, 100% { transform: scaleY(1); }
  96% { transform: scaleY(0.1); }
`;

// how far a hidden slide waits to the left or right of the visible one.
const SLIDE_OFFSET = 18;

// every slide stays mounted. The active one is visible; the others fade out and
// wait on the left (earlier slides) or on the right (later slides).
function layerStyle(index: number, active: number, reduceMotion: boolean) {
  const isActive = index === active;
  const shift = isActive ? 0 : index < active ? -SLIDE_OFFSET : SLIDE_OFFSET;
  return {
    opacity: isActive ? 1 : 0,
    transform: `translateX(${shift}px)`,
    transition: reduceMotion
      ? 'none'
      : 'opacity 500ms ease, transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
    pointerEvents: isActive ? 'auto' : 'none',
  } as const;
}

function BoyAvatar({ mood }: { mood: BoyMood }) {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true">
      <rect width="80" height="80" fill="#CFE6BC" />
      <path d="M8 84c2-15 14-24 32-24s30 9 32 24z" fill="#fff" stroke="#111" strokeWidth="2" />
      <rect x="34" y="50" width="12" height="12" fill="#fff" stroke="#111" strokeWidth="2" />
      <ellipse cx="40" cy="37" rx="14" ry="16" fill="#fff" stroke="#111" strokeWidth="2" />
      <path d="M25 33c-2-14 8-22 20-19 10 2 13 10 10 19-2-6-7-9-13-9-8 0-14 3-17 9z" fill="#111" />
      <circle className="eye" cx="34.5" cy="38" r="1.7" fill="#111" />
      <circle className="eye" cx="45.5" cy="38" r="1.7" fill="#111" />
      {mood === 'laugh' && <path d="M34 45c3 4 9 4 12 0z" fill="#111" />}
      {mood === 'smile' && (
        <path d="M35 45.5c3 3 7 3 10 0" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
      )}
      {mood === 'think' && (
        <>
          <path d="M37 46.5h8" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M42 34.5q3.5-2.5 7 0" fill="none" stroke="#111" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function GirlAvatar({ mood }: { mood: GirlMood }) {
  return (
    <svg viewBox="0 0 80 80" width="100%" height="100%" aria-hidden="true">
      <rect width="80" height="80" fill="#F4F8EE" />
      <path d="M19 62c-5-24-1-46 21-46s26 22 21 46z" fill="#111" />
      <path d="M8 84c2-15 14-22 32-22s30 7 32 22z" fill="#fff" stroke="#111" strokeWidth="2" />
      <ellipse cx="40" cy="40" rx="13" ry="15" fill="#fff" stroke="#111" strokeWidth="2" />
      <path d="M26 37c1-11 8-15 15-15s13 4 13 15c-4-4-9-7-14-7s-9 3-14 7z" fill="#111" />
      {mood === 'happy' ? (
        <path
          d="M32 41.5q3-3.5 6 0M42 41.5q3-3.5 6 0"
          fill="none"
          stroke="#111"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle className="eye" cx="35" cy="41" r="1.7" fill="#111" />
          <circle className="eye" cx="45" cy="41" r="1.7" fill="#111" />
        </>
      )}
      {mood === 'surprised' && (
        <ellipse cx="40" cy="49" rx="2.6" ry="3.2" fill="#fff" stroke="#111" strokeWidth="1.6" />
      )}
      {mood === 'smile' && (
        <path d="M35.5 48.5c2.5 3 6.5 3 9 0" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" />
      )}
      {mood === 'happy' && <path d="M35 47.5c1.5 5 8.5 5 10 0z" fill="#111" />}
    </svg>
  );
}

type AvatarBadgeProps = {
  children: React.ReactNode;
  place: object; // where it sits on the picture
  floatOffset: number; //seconds: makes the two avatars bob out of sync
  hopDelay: number; // seconds: the second avatar reacts a moment later
  blinkSeconds: number; // how often the eyes blink
  reactions: number; //goes up every time the slide changes
  animate: boolean;
};

function AvatarBadge({ children, place, floatOffset, hopDelay, blinkSeconds, reactions, animate }: AvatarBadgeProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: avatarSize,
        height: avatarSize,
        animation: animate ? `${float} 5s ease-in-out -${floatOffset}s infinite` : 'none',
        ...place,
      }}
    >
      {/* new key on every slide change: the avatar is redrawn and hops */}
      <Box
        key={reactions}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid #111',
          transition: 'transform 200ms ease',
          '&:hover': { transform: 'scale(1.08)' },
          animation: animate && reactions > 0 ? `${hop} 600ms ease ${hopDelay}s` : 'none',
          '& .eye': {
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: animate ? `${blink} ${blinkSeconds}s ease-in-out infinite` : 'none',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function TaskCard({ card, active, layer }: { card: TaskCardData; active: boolean; layer: object }) {
  return (
    <Box
      aria-hidden={!active}
      sx={{
        position: 'absolute',
        left: { md: '-4%', lg: '-2%' },
        bottom: '12%',
        width: { md: 160, lg: 190 },
        p: 2,
        bgcolor: '#FBFCF9',
        border: '1px solid #C9C9C9',
        borderRadius: '22px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
        ...layer,
      }}
    >
      <Typography sx={{ fontWeight: 500, fontSize: { md: 15, lg: 18 }, lineHeight: 1.2 }}>
        {card.title}
      </Typography>
      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{card.tasks} Task</Typography>

      {/* progress ring: the done part is green, the rest is black */}
      <Box sx={{ position: 'absolute', right: 14, top: 42, width: 40, height: 40 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={40}
          thickness={5}
          sx={{ color: '#111', position: 'absolute', inset: 0 }}
        />
        <CircularProgress
          variant="determinate"
          value={active ? card.percent : 0}
          size={40}
          thickness={5}
          sx={{
            color: '#A8D08D',
            position: 'absolute',
            inset: 0,
            '& .MuiCircularProgress-circle': { strokeLinecap: 'butt' },
          }}
        />
        <Typography
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 500,
          }}
        >
          {card.percent}%
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'inline-block',
          mt: 1.5,
          px: 1.5,
          py: 0.25,
          fontSize: 12,
          border: '1px solid #111',
          borderRadius: 50,
        }}
      >
        {card.tag}
      </Box>
    </Box>
  );
}

export default function IllustrationPanel() {
  const [active, setActive] = useState(DESIGN_SLIDE);
  const [reactions, setReactions] = useState(0);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const moods = SLIDES[active].moods;

  const goTo = (index: number) => {
    if (index === active) return;
    setActive(index);
    setReactions((n) => n + 1);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#F4F8EE',
        borderRadius: 3,
        p: 4,
        overflow: 'hidden',
      }}
    >
      {/* illustration with the floating avatars and task card on top */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 520 }}>
        <Box
          component="img"
          src={illustration}
          alt="Person meditating while their tasks stay organized"
          sx={{ display: 'block', width: '100%' }}
        />
        <AvatarBadge
          place={{ left: '4%', top: '12%' }}
          floatOffset={0}
          hopDelay={0}
          blinkSeconds={4.6}
          reactions={reactions}
          animate={!reduceMotion}
        >
          <BoyAvatar mood={moods.boy} />
        </AvatarBadge>
        <AvatarBadge
          place={{ right: '0%', top: '55%' }}
          floatOffset={2.4}
          hopDelay={0.12}
          blinkSeconds={5.4}
          reactions={reactions}
          animate={!reduceMotion}
        >
          <GirlAvatar mood={moods.girl} />
        </AvatarBadge>

        {/* every card stays mounted, so the old one can fade out while the new one fades in */}
        {SLIDES.map((item, i) => (
          <TaskCard
            key={item.card.title}
            card={item.card}
            active={i === active}
            layer={layerStyle(i, active, reduceMotion)}
          />
        ))}
      </Box>

      {/* carousel dots: click one to change slide */}
      <Box role="group" aria-label="Choose a slide" sx={{ display: 'flex', gap: 1, mt: 5 }}>
        {SLIDES.map((item, i) => {
          const isActive = i === active;
          return (
            <Box
              key={item.card.title}
              component="button"
              type="button"
              aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
              aria-current={isActive}
              onClick={() => goTo(i)}
              sx={{
                position: 'relative',
                p: 0,
                border: 0,
                cursor: 'pointer',
                height: 8,
                width: isActive ? 24 : 8,
                borderRadius: 4,
                bgcolor: isActive ? '#111' : '#D4D9CF',
                transition: reduceMotion
                  ? 'none'
                  : 'width 400ms cubic-bezier(0.22, 1, 0.36, 1), background-color 300ms ease',
                // bigger invisible hit area so the small dots are easy to tap
                '&::after': { content: '""', position: 'absolute', inset: -8 },
                '&:focus-visible': { outline: '2px solid #111', outlineOffset: 3 },
              }}
            />
          );
        })}
      </Box>

      {/* all captions share one grid cell, so the height never jumps */}
      <Box sx={{ display: 'grid', width: '100%', mt: 4 }}>
        {SLIDES.map((item, i) => (
          <Typography
            key={item.card.title}
            aria-hidden={i !== active}
            sx={{
              gridArea: '1 / 1',
              textAlign: 'center',
              fontSize: 'clamp(20px, 1.8vw, 28px)',
              lineHeight: 1.35,
              ...layerStyle(i, active, reduceMotion),
            }}
          >
            {item.caption}
            <br />
            with{' '}
            <Box component="span" sx={{ fontWeight: 600 }}>
              Tuga’s App
            </Box>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}