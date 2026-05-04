import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  VStack,
  Heading,
  Container,
  Separator,
} from '@chakra-ui/react';
import MarqueeBanner from './MarqueeBanner';
import RaceTrack from './RaceTrack';
import ControlPanel from './ControlPanel';
import ResultTable from './ResultTable';
import AnalysisPanel from './AnalysisPanel';
import {
  HORSE_LEVELS,
  KING_HORSES,
  TIANYI_HORSES,
  simulateRace,
  findOptimalStrategy,
  findTianyiBestAgainstKingOrder,
  HORSE_NAMES,
} from '../utils/gameLogic';

const HorseRacingGame = () => {
  const [showMarquee, setShowMarquee] = useState(true);
  const [marqueeMessages, setMarqueeMessages] = useState([]);
  
  const [kingOrder, setKingOrder] = useState([
    HORSE_LEVELS.SUPERIOR,
    HORSE_LEVELS.MEDIUM,
    HORSE_LEVELS.INFERIOR,
  ]);
  const [tianyiOrder, setTianyiOrder] = useState([
    HORSE_LEVELS.SUPERIOR,
    HORSE_LEVELS.MEDIUM,
    HORSE_LEVELS.INFERIOR,
  ]);

  const [currentRound, setCurrentRound] = useState(0);
  const [isRacing, setIsRacing] = useState(false);
  const [raceResults, setRaceResults] = useState([]);
  const [kingWins, setKingWins] = useState(0);
  const [tianyiWins, setTianyiWins] = useState(0);
  const [overallWinner, setOverallWinner] = useState(null);

  const [kingPosition, setKingPosition] = useState(0);
  const [tianyiPosition, setTianyiPosition] = useState(0);

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [allStrategies, setAllStrategies] = useState(null);

  const animationRef = useRef(null);

  const canStart = kingOrder.every(h => h) && tianyiOrder.every(h => h);

  const getCurrentHorses = () => {
    if (currentRound >= 3 || currentRound < 0) return { kingHorse: null, tianyiHorse: null };
    return {
      kingHorse: KING_HORSES[kingOrder[currentRound]],
      tianyiHorse: TIANYI_HORSES[tianyiOrder[currentRound]],
    };
  };

  const resetGame = () => {
    if (animationRef.current && cancelAnimationFrame(animationRef.current));
    setCurrentRound(0);
    setIsRacing(false);
    setRaceResults([]);
    setKingWins(0);
    setTianyiWins(0);
    setOverallWinner(null);
    setKingPosition(0);
    setTianyiPosition(0);
    setShowAnalysis(false);
    setKingOrder([
      HORSE_LEVELS.SUPERIOR,
      HORSE_LEVELS.MEDIUM,
      HORSE_LEVELS.INFERIOR,
    ]);
    setTianyiOrder([
      HORSE_LEVELS.SUPERIOR,
      HORSE_LEVELS.MEDIUM,
      HORSE_LEVELS.INFERIOR,
    ]);
  };

  const animateRace = useCallback((kingSpeed, tianyiSpeed) => {
    setIsRacing(true);
    setKingPosition(0);
    setTianyiPosition(0);

    const startTime = Date.now();
    const duration = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const kingProgress = progress * (kingSpeed / 100);
      const tianyiProgress = progress * (tianyiSpeed / 100);

      setKingPosition(kingProgress * 95);
      setTianyiPosition(tianyiProgress * 95);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsRacing(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const showAlert = (title, message) => {
    alert(`${title}\n\n${message}`);
  };

  const startRace = () => {
    if (!canStart || isRacing || currentRound >= 3) return;

    const { kingHorse, tianyiHorse } = getCurrentHorses();
    if (!kingHorse || !tianyiHorse) return;

    animateRace(kingHorse.speed, tianyiHorse.speed);

    setTimeout(() => {
      const result = simulateRace(kingOrder, tianyiOrder);
      
      const currentResult = result.results[currentRound];
      setRaceResults(prev => [...prev, currentResult]);
      
      setKingWins(result.kingWins);
      setTianyiWins(result.tianyiWins);
      
      if (currentRound === 2) {
        setOverallWinner(result.overallWinner);
        
        if (result.overallWinner === 'tianyi') {
          showAlert(
            '恭喜！田忌获胜！',
            '田忌以弱胜强，展现了出色的策略智慧！'
          );
          setMarqueeMessages(['恭喜田忌获胜！这就是策略的力量！', '以弱胜强，以强击弱！', '田忌赛马的故事告诉我们：策略比实力更重要！']);
        } else if (result.overallWinner === 'king') {
          showAlert(
            '齐王获胜',
            '齐王的马匹实力更强，田忌需要更好的策略。'
          );
        }
        
        setShowAnalysis(true);
        if (!allStrategies) {
          setAllStrategies(findOptimalStrategy());
        }
      }

      setCurrentRound(prev => prev + 1);
    }, 3500);
  };

  const analyzeStrategy = () => {
    if (!allStrategies) {
      setAllStrategies(findOptimalStrategy());
    }
    setShowAnalysis(!showAnalysis);

    if (kingOrder.every(h => h)) {
      const bestStrategy = findTianyiBestAgainstKingOrder(kingOrder);
      showAlert(
        '策略分析完成',
        `对阵齐王 [${kingOrder.map(h => HORSE_NAMES[h]).join(' → ')}]，\n田忌的最优策略是：[${bestStrategy.bestOrderNames.join(' → ')}]`
      );
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const { kingHorse, tianyiHorse } = getCurrentHorses();

  return (
    <VStack gap={0} minH="100vh" bg="gray.50">
      <MarqueeBanner
        messages={marqueeMessages}
        isVisible={showMarquee}
        onToggle={() => setShowMarquee(!showMarquee)}
      />

      <Container maxW="container.xl" py={6} px={[4, 6]}>
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="2xl" color="#8b4513" mb={2}>
            🏇 齐王与田忌赛马 🏇
          </Heading>
          <Heading as="h2" size="md" color="gray.600" fontWeight="normal">
            经典博弈故事的互动模拟器
          </Heading>
        </Box>

        <RaceTrack
          currentRound={currentRound + 1}
          kingHorse={kingHorse}
          tianyiHorse={tianyiHorse}
          isRacing={isRacing}
          kingPosition={kingPosition}
          tianyiPosition={tianyiPosition}
        />

        <Separator my={6} />

        <ControlPanel
          kingOrder={kingOrder}
          tianyiOrder={tianyiOrder}
          onKingOrderChange={setKingOrder}
          onTianyiOrderChange={setTianyiOrder}
          onStartRace={startRace}
          onReset={resetGame}
          onAnalyze={analyzeStrategy}
          canStart={canStart}
          isRacing={isRacing}
          currentRound={currentRound}
        />

        <Separator my={6} />

        <ResultTable
          raceResults={raceResults}
          isOptimal={false}
          kingWins={kingWins}
          tianyiWins={tianyiWins}
          overallWinner={overallWinner}
        />

        <AnalysisPanel
          isVisible={showAnalysis}
          strategies={allStrategies}
          currentKingOrder={kingOrder}
          currentTianyiOrder={tianyiOrder}
        />

        <Box mt={8} py={4} textAlign="center">
          <Box fontSize="sm" color="gray.500">
            <p>齐王马匹速度：上等马 100 | 中等马 80 | 下等马 60</p>
            <p>田忌马匹速度：上等马 90 | 中等马 70 | 下等马 50</p>
          </Box>
        </Box>
      </Container>
    </VStack>
  );
};

export default HorseRacingGame;
