import { useEffect, useRef } from 'react';
import { heroFragments } from '../../data/siteContent.js';

const MOBILE_BREAKPOINT = 768;
const MOBILE_FRAGMENT_COUNT = 20;
const DESKTOP_FRAGMENT_COUNT = 45;
const MOBILE_LIGHT_SIZE = 980;
const DESKTOP_LIGHT_SIZE = 1560;
const MOBILE_LIGHT_BLUR = 132;
const DESKTOP_LIGHT_BLUR = 180;
const MOBILE_CORE_SIZE = 420;
const DESKTOP_CORE_SIZE = 560;
const MOBILE_CORE_BLUR = 54;
const DESKTOP_CORE_BLUR = 72;
const GLOW_FOLLOW_EASING = 0.05;
const CORE_FOLLOW_EASING = 0.1;
const LIGHT_SCALE_EASING = 0.08;
const MOBILE_REPULSION_RADIUS = 96;
const DESKTOP_REPULSION_RADIUS = 150;
const POINTER_ACTIVATION_SPEED = 0.35;
const POINTER_FORCE_MULTIPLIER = 0.072;
const MAX_POINTER_FORCE = 4.2;
const PARTICLE_VELOCITY_DECAY = 0.955;
const BASE_DRIFT_SPEED = 0.22;
const PARTICLE_BOUNDARY_PADDING = 28;
const PARTICLE_BOUNDARY_DAMPING = 0.58;
const DRAG_HIT_PADDING = 18;
const DRAG_RELEASE_MULTIPLIER = 0.16;
const MAX_DRAG_RELEASE_VELOCITY = 4.8;
const CLOTH_GRAB_STRENGTH = 0.2;
const CLOTH_LINK_STRENGTH = 0.08;
const CLOTH_DAMPING = 0.72;
const CLOTH_ITERATIONS = 2;
const CLOTH_ROTATION_LIMIT = 0.42;
const CLOTH_SETTLE_STRENGTH = 0.055;
const CLOTH_SETTLE_THRESHOLD = 0.85;
const CLOTH_RELEASE_MIN_FRAMES = 34;
const CLOTH_RELEASE_MAX_FRAMES = 110;

function createParticles(count, width, height) {
  return Array.from({ length: count }, () => ({
    text: heroFragments[Math.floor(Math.random() * heroFragments.length)],
    x: Math.random() * width,
    y: Math.random() * height,
    baseVx: (Math.random() - 0.5) * BASE_DRIFT_SPEED,
    baseVy: (Math.random() - 0.5) * BASE_DRIFT_SPEED,
    vx: 0,
    vy: 0,
    opacityFactor: Math.random(),
    currentOpacity: 0,
    fontSize: Math.floor(Math.random() * 8) + 14,
    cloth: null,
  }));
}

function getPointerCoordinates(event) {
  if ('touches' in event && event.touches.length > 0) {
    const [touch] = event.touches;
    return { x: touch.clientX, y: touch.clientY };
  }

  if ('changedTouches' in event && event.changedTouches.length > 0) {
    const [touch] = event.changedTouches;
    return { x: touch.clientX, y: touch.clientY };
  }

  return { x: event.clientX, y: event.clientY };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function HeroScene({ isDark, loadStage }) {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const coreRef = useRef(null);
  const isDarkRef = useRef(isDark);
  const loadStageRef = useRef(loadStage);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    loadStageRef.current = loadStage;
  }, [loadStage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const glow = glowRef.current;
    const core = coreRef.current;

    if (!canvas || !context) {
      return undefined;
    }

    let animationFrameId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let glowSize = DESKTOP_LIGHT_SIZE;
    let coreSize = DESKTOP_CORE_SIZE;

    const pointer = { x: width / 2, y: height / 2 };
    const previousPointer = { ...pointer };
    const glowPointer = { ...pointer };
    const corePointer = { ...pointer };
    const dragState = {
      particle: null,
      offsetX: 0,
      offsetY: 0,
      targetX: 0,
      targetY: 0,
      lastX: pointer.x,
      lastY: pointer.y,
      velocityX: 0,
      velocityY: 0,
      glyphs: [],
      grabIndex: 0,
    };
    const lightState = {
      glowScale: 1,
      coreScale: 1,
      glowOpacity: 0,
      coreOpacity: 0,
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const syncLightSize = () => {
      if (!glow || !core) {
        return;
      }

      const isMobile = width < MOBILE_BREAKPOINT;
      glowSize = isMobile ? MOBILE_LIGHT_SIZE : DESKTOP_LIGHT_SIZE;
      coreSize = isMobile ? MOBILE_CORE_SIZE : DESKTOP_CORE_SIZE;
      const glowBlur = isMobile ? MOBILE_LIGHT_BLUR : DESKTOP_LIGHT_BLUR;
      const coreBlur = isMobile ? MOBILE_CORE_BLUR : DESKTOP_CORE_BLUR;

      glow.style.width = `${glowSize}px`;
      glow.style.height = `${glowSize}px`;
      glow.style.filter = `blur(${glowBlur}px)`;

      core.style.width = `${coreSize}px`;
      core.style.height = `${coreSize}px`;
      core.style.filter = `blur(${coreBlur}px)`;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      syncLightSize();

      const particleCount = width < MOBILE_BREAKPOINT ? MOBILE_FRAGMENT_COUNT : DESKTOP_FRAGMENT_COUNT;
      particles = createParticles(particleCount, width, height);
      dragState.particle = null;
      dragState.glyphs = [];
    };

    const getCanvasPointerCoordinates = (event) => {
      const { x, y } = getPointerCoordinates(event);
      const rect = canvas.getBoundingClientRect();

      return {
        x: x - rect.left,
        y: y - rect.top,
        isInside: x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom,
      };
    };

    const setParticleFont = (particle) => {
      context.font = `300 ${particle.fontSize}px "JetBrains Mono", "PingFang SC", sans-serif`;
    };

    const getParticleTextWidth = (particle) => {
      setParticleFont(particle);
      return context.measureText(particle.text).width;
    };

    const getParticleBounds = (particle) => {
      const textWidth = getParticleTextWidth(particle);
      const minX = PARTICLE_BOUNDARY_PADDING;
      const maxX = Math.max(minX, width - textWidth - PARTICLE_BOUNDARY_PADDING);
      const minY = PARTICLE_BOUNDARY_PADDING + particle.fontSize;
      const maxY = Math.max(minY, height - PARTICLE_BOUNDARY_PADDING);

      return { minX, maxX, minY, maxY };
    };

    const containParticle = (particle) => {
      const bounds = getParticleBounds(particle);

      if (particle.x < bounds.minX) {
        particle.x = bounds.minX;
        particle.baseVx = Math.abs(particle.baseVx);
        particle.vx = Math.abs(particle.vx) * PARTICLE_BOUNDARY_DAMPING;
      } else if (particle.x > bounds.maxX) {
        particle.x = bounds.maxX;
        particle.baseVx = -Math.abs(particle.baseVx);
        particle.vx = -Math.abs(particle.vx) * PARTICLE_BOUNDARY_DAMPING;
      }

      if (particle.y < bounds.minY) {
        particle.y = bounds.minY;
        particle.baseVy = Math.abs(particle.baseVy);
        particle.vy = Math.abs(particle.vy) * PARTICLE_BOUNDARY_DAMPING;
      } else if (particle.y > bounds.maxY) {
        particle.y = bounds.maxY;
        particle.baseVy = -Math.abs(particle.baseVy);
        particle.vy = -Math.abs(particle.vy) * PARTICLE_BOUNDARY_DAMPING;
      }
    };

    const clampDragTarget = (particle, targetX, targetY, grabbedGlyph) => {
      const bounds = getParticleBounds(particle);
      const grabOffsetX = grabbedGlyph?.restOffsetX || 0;

      return {
        x: clamp(targetX, bounds.minX + grabOffsetX, bounds.maxX + grabOffsetX),
        y: clamp(targetY, bounds.minY, bounds.maxY),
      };
    };

    const containGlyphChain = (particle, glyphs) => {
      if (!glyphs.length) {
        return;
      }

      const minX = Math.min(...glyphs.map((glyph) => glyph.x));
      const maxX = Math.max(...glyphs.map((glyph) => glyph.x + glyph.width));
      const minBaseline = Math.min(...glyphs.map((glyph) => glyph.y));
      const maxBaseline = Math.max(...glyphs.map((glyph) => glyph.y));
      const minY = PARTICLE_BOUNDARY_PADDING + particle.fontSize;
      const maxY = Math.max(minY, height - PARTICLE_BOUNDARY_PADDING);
      let shiftX = 0;
      let shiftY = 0;

      if (minX < PARTICLE_BOUNDARY_PADDING) {
        shiftX = PARTICLE_BOUNDARY_PADDING - minX;
      } else if (maxX > width - PARTICLE_BOUNDARY_PADDING) {
        shiftX = width - PARTICLE_BOUNDARY_PADDING - maxX;
      }

      if (minBaseline < minY) {
        shiftY = minY - minBaseline;
      } else if (maxBaseline > maxY) {
        shiftY = maxY - maxBaseline;
      }

      if (shiftX === 0 && shiftY === 0) {
        return;
      }

      glyphs.forEach((glyph) => {
        glyph.x += shiftX;
        glyph.y += shiftY;
        glyph.vx *= PARTICLE_BOUNDARY_DAMPING;
        glyph.vy *= PARTICLE_BOUNDARY_DAMPING;
      });
    };

    const createClothGlyphs = (particle, grabX) => {
      setParticleFont(particle);

      let cursorX = particle.x;
      let grabIndex = 0;
      let closestDistance = Infinity;
      const glyphs = Array.from(particle.text).map((char, index) => {
        const width = context.measureText(char).width || particle.fontSize * 0.55;
        const centerX = cursorX + width / 2;
        const distance = Math.abs(centerX - grabX);

        if (distance < closestDistance) {
          closestDistance = distance;
          grabIndex = index;
        }

        const glyph = {
          char,
          x: cursorX,
          y: particle.y,
          vx: 0,
          vy: 0,
          width,
          restOffsetX: cursorX - particle.x,
        };

        cursorX += width;
        return glyph;
      });

      return { glyphs, grabIndex };
    };

    const applyClothLinkForces = (glyphs) => {
      for (let iteration = 0; iteration < CLOTH_ITERATIONS; iteration += 1) {
        for (let i = 1; i < glyphs.length; i += 1) {
          const previousGlyph = glyphs[i - 1];
          const glyph = glyphs[i];
          const stretchX = (glyph.x - previousGlyph.x) - previousGlyph.width;
          const stretchY = glyph.y - previousGlyph.y;

          previousGlyph.vx += stretchX * CLOTH_LINK_STRENGTH;
          previousGlyph.vy += stretchY * CLOTH_LINK_STRENGTH;
          glyph.vx -= stretchX * CLOTH_LINK_STRENGTH;
          glyph.vy -= stretchY * CLOTH_LINK_STRENGTH;
        }
      }
    };

    const stepClothGlyphs = (glyphs) => {
      glyphs.forEach((glyph) => {
        glyph.vx *= CLOTH_DAMPING;
        glyph.vy *= CLOTH_DAMPING;
        glyph.x += glyph.vx;
        glyph.y += glyph.vy;
      });
    };

    const updateClothGlyphs = () => {
      const { glyphs, grabIndex } = dragState;
      if (!glyphs.length) {
        return;
      }

      const grabbedGlyph = glyphs[grabIndex];
      grabbedGlyph.vx += (dragState.targetX - grabbedGlyph.x) * CLOTH_GRAB_STRENGTH;
      grabbedGlyph.vy += (dragState.targetY - grabbedGlyph.y) * CLOTH_GRAB_STRENGTH;

      applyClothLinkForces(glyphs);
      stepClothGlyphs(glyphs);
      containGlyphChain(dragState.particle, glyphs);

      const firstGlyph = glyphs[0];
      const averageY = glyphs.reduce((sum, glyph) => sum + glyph.y, 0) / glyphs.length;
      dragState.particle.x = firstGlyph.x;
      dragState.particle.y = averageY;
    };

    const settleReleasedCloth = (particle) => {
      const cloth = particle.cloth;
      if (!cloth?.glyphs?.length) {
        return false;
      }

      cloth.frames += 1;

      cloth.glyphs.forEach((glyph) => {
        const targetX = particle.x + glyph.restOffsetX;
        const targetY = particle.y;
        glyph.vx += (targetX - glyph.x) * CLOTH_SETTLE_STRENGTH;
        glyph.vy += (targetY - glyph.y) * CLOTH_SETTLE_STRENGTH;
      });

      applyClothLinkForces(cloth.glyphs);
      stepClothGlyphs(cloth.glyphs);
      containGlyphChain(particle, cloth.glyphs);

      const maxMotion = cloth.glyphs.reduce((max, glyph) => {
        const targetX = particle.x + glyph.restOffsetX;
        const targetY = particle.y;
        const distance = Math.abs(targetX - glyph.x) + Math.abs(targetY - glyph.y);
        const velocity = Math.abs(glyph.vx) + Math.abs(glyph.vy);
        return Math.max(max, distance + velocity);
      }, 0);

      if (
        (cloth.frames >= CLOTH_RELEASE_MIN_FRAMES && maxMotion < CLOTH_SETTLE_THRESHOLD) ||
        cloth.frames >= CLOTH_RELEASE_MAX_FRAMES
      ) {
        particle.cloth = null;
        return false;
      }

      return true;
    };

    const drawClothGlyphs = (particle, glyphs) => {
      if (!glyphs.length) {
        return false;
      }

      setParticleFont(particle);
      glyphs.forEach((glyph, index) => {
        const nextGlyph = glyphs[index + 1] || glyph;
        const previousGlyph = glyphs[index - 1] || glyph;
        const angle = clamp(
          Math.atan2(nextGlyph.y - previousGlyph.y, nextGlyph.x - previousGlyph.x),
          -CLOTH_ROTATION_LIMIT,
          CLOTH_ROTATION_LIMIT
        );

        context.save();
        context.translate(glyph.x, glyph.y);
        context.rotate(angle * 0.45);
        context.fillText(glyph.char, 0, 0);
        context.restore();
      });

      return true;
    };

    const findParticleAt = (x, y) => {
      let selectedParticle = null;
      let selectedDistance = Infinity;

      particles.forEach((particle) => {
        if (particle.currentOpacity < 0.01) {
          return;
        }

        setParticleFont(particle);
        const textWidth = getParticleTextWidth(particle);
        const left = particle.x - DRAG_HIT_PADDING;
        const right = particle.x + textWidth + DRAG_HIT_PADDING;
        const top = particle.y - particle.fontSize - DRAG_HIT_PADDING;
        const bottom = particle.y + DRAG_HIT_PADDING;

        if (x < left || x > right || y < top || y > bottom) {
          return;
        }

        const centerX = particle.x + textWidth / 2;
        const centerY = particle.y - particle.fontSize / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = dx * dx + dy * dy;

        if (distance < selectedDistance) {
          selectedParticle = particle;
          selectedDistance = distance;
        }
      });

      return selectedParticle;
    };

    const handlePointerMove = (event) => {
      const { x, y, isInside } = getCanvasPointerCoordinates(event);
      if (!isInside && !dragState.particle) {
        return;
      }

      pointer.x = x;
      pointer.y = y;

      if (!dragState.particle) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      const grabbedGlyph = dragState.glyphs[dragState.grabIndex];
      const target = clampDragTarget(
        dragState.particle,
        x + dragState.offsetX,
        y + dragState.offsetY,
        grabbedGlyph
      );
      dragState.targetX = target.x;
      dragState.targetY = target.y;
      dragState.velocityX = x - dragState.lastX;
      dragState.velocityY = y - dragState.lastY;
      dragState.lastX = x;
      dragState.lastY = y;
    };

    const handlePointerDown = (event) => {
      if (loadStageRef.current < 2 || prefersReducedMotion) {
        return;
      }

      const { x, y, isInside } = getCanvasPointerCoordinates(event);
      if (!isInside) {
        return;
      }

      pointer.x = x;
      pointer.y = y;

      const particle = findParticleAt(x, y);
      if (!particle) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      containParticle(particle);
      const { glyphs, grabIndex } = createClothGlyphs(particle, x);
      const grabbedGlyph = glyphs[grabIndex];
      const target = clampDragTarget(particle, grabbedGlyph.x, grabbedGlyph.y, grabbedGlyph);

      dragState.particle = particle;
      dragState.glyphs = glyphs;
      dragState.grabIndex = grabIndex;
      dragState.offsetX = grabbedGlyph.x - x;
      dragState.offsetY = grabbedGlyph.y - y;
      dragState.targetX = target.x;
      dragState.targetY = target.y;
      dragState.lastX = x;
      dragState.lastY = y;
      dragState.velocityX = 0;
      dragState.velocityY = 0;
      particle.vx = 0;
      particle.vy = 0;
      document.body.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
      if (!dragState.particle) {
        return;
      }

      dragState.particle.vx = clamp(
        dragState.velocityX * DRAG_RELEASE_MULTIPLIER,
        -MAX_DRAG_RELEASE_VELOCITY,
        MAX_DRAG_RELEASE_VELOCITY
      );
      dragState.particle.vy = clamp(
        dragState.velocityY * DRAG_RELEASE_MULTIPLIER,
        -MAX_DRAG_RELEASE_VELOCITY,
        MAX_DRAG_RELEASE_VELOCITY
      );
      dragState.particle.cloth = {
        glyphs: dragState.glyphs,
        frames: 0,
      };
      dragState.glyphs = [];
      dragState.particle = null;
      document.body.style.cursor = '';
    };

    const render = () => {
      context.clearRect(0, 0, width, height);

      const currentIsDark = isDarkRef.current;
      const currentLoadStage = loadStageRef.current;
      const pointerDeltaX = pointer.x - previousPointer.x;
      const pointerDeltaY = pointer.y - previousPointer.y;
      const pointerSpeed = Math.sqrt(pointerDeltaX * pointerDeltaX + pointerDeltaY * pointerDeltaY);
      const glowFollowEasing = prefersReducedMotion ? 1 : GLOW_FOLLOW_EASING;
      const coreFollowEasing = prefersReducedMotion ? 1 : CORE_FOLLOW_EASING;
      const motionAmount = prefersReducedMotion ? 0 : Math.min(pointerSpeed / 28, 1);

      glowPointer.x += (pointer.x - glowPointer.x) * glowFollowEasing;
      glowPointer.y += (pointer.y - glowPointer.y) * glowFollowEasing;
      corePointer.x += (pointer.x - corePointer.x) * coreFollowEasing;
      corePointer.y += (pointer.y - corePointer.y) * coreFollowEasing;

      const targetGlowScale = 1 + motionAmount * (currentIsDark ? 0.07 : 0.05);
      const targetCoreScale = 1 + motionAmount * (currentIsDark ? 0.045 : 0.035);
      const targetGlowOpacity = currentLoadStage >= 1 ? (currentIsDark ? 0.94 : 0.9) : 0;
      const targetCoreOpacity = currentLoadStage >= 1 ? (currentIsDark ? 0.92 : 0.88) : 0;

      lightState.glowScale += (targetGlowScale - lightState.glowScale) * LIGHT_SCALE_EASING;
      lightState.coreScale += (targetCoreScale - lightState.coreScale) * LIGHT_SCALE_EASING;
      lightState.glowOpacity += (targetGlowOpacity - lightState.glowOpacity) * 0.14;
      lightState.coreOpacity += (targetCoreOpacity - lightState.coreOpacity) * 0.16;

      if (glow) {
        const glowRadius = glowSize / 2;
        glow.style.transform = `translate(${glowPointer.x - glowRadius}px, ${glowPointer.y - glowRadius}px) scale(${lightState.glowScale})`;
        glow.style.opacity = String(lightState.glowOpacity);
      }

      if (core) {
        const coreRadius = coreSize / 2;
        core.style.transform = `translate(${corePointer.x - coreRadius}px, ${corePointer.y - coreRadius}px) scale(${lightState.coreScale})`;
        core.style.opacity = String(lightState.coreOpacity);
      }

      const isMobile = width < MOBILE_BREAKPOINT;
      const repulsionRadius = isMobile ? MOBILE_REPULSION_RADIUS : DESKTOP_REPULSION_RADIUS;
      const glowRadius = isMobile ? 140 : 210;
      const textColor = currentIsDark ? '244, 244, 245' : '39, 39, 42';

      particles.forEach((particle) => {
        const isDraggedParticle = particle === dragState.particle;
        let hasReleasedCloth = false;

        if (isDraggedParticle) {
          updateClothGlyphs();
          particle.vx = 0;
          particle.vy = 0;
        } else {
          particle.x += particle.baseVx;
          particle.y += particle.baseVy;
        }

        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const safeDistance = distance || 0.0001;

        if (!isDraggedParticle && distance < repulsionRadius && pointerSpeed > POINTER_ACTIVATION_SPEED) {
          const force = Math.pow((repulsionRadius - distance) / repulsionRadius, 2);
          particle.vx += (dx / safeDistance) * force * Math.min(pointerSpeed * POINTER_FORCE_MULTIPLIER, MAX_POINTER_FORCE);
          particle.vy += (dy / safeDistance) * force * Math.min(pointerSpeed * POINTER_FORCE_MULTIPLIER, MAX_POINTER_FORCE);
        }

        if (!isDraggedParticle) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= PARTICLE_VELOCITY_DECAY;
          particle.vy *= PARTICLE_VELOCITY_DECAY;
          containParticle(particle);
        }

        if (!isDraggedParticle) {
          hasReleasedCloth = settleReleasedCloth(particle);
        }

        const baseOpacity = currentIsDark
          ? particle.opacityFactor * 0.05 + 0.03
          : particle.opacityFactor * 0.15 + 0.08;

        let targetOpacity = 0;
        if (currentLoadStage >= 2) {
          const glowMultiplier = distance < glowRadius ? (currentIsDark ? 1.85 : 1.55) : 1;
          targetOpacity = Math.min(baseOpacity * glowMultiplier, currentIsDark ? 0.19 : 0.29);
        }

        if (isDraggedParticle) {
          targetOpacity = Math.max(targetOpacity, currentIsDark ? 0.28 : 0.38);
        }
        if (hasReleasedCloth) {
          targetOpacity = Math.max(targetOpacity, currentIsDark ? 0.22 : 0.32);
        }

        particle.currentOpacity += (targetOpacity - particle.currentOpacity) * 0.05;

        if (particle.currentOpacity > 0.005) {
          setParticleFont(particle);
          context.fillStyle = `rgba(${textColor}, ${particle.currentOpacity})`;
          const clothGlyphs = isDraggedParticle ? dragState.glyphs : particle.cloth?.glyphs;
          if (!clothGlyphs || !drawClothGlyphs(particle, clothGlyphs)) {
            context.fillText(particle.text, particle.x, particle.y);
          }
        }
      });

      previousPointer.x = pointer.x;
      previousPointer.y = pointer.y;
      animationFrameId = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      document.body.style.cursor = '';
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.024) 0%, rgba(255,255,255,0.016) 52%, rgba(255,255,255,0.024) 100%)'
            : 'linear-gradient(180deg, rgba(0,0,0,0.024) 0%, rgba(0,0,0,0.014) 52%, rgba(0,0,0,0.024) 100%)',
          opacity: loadStage >= 1 ? 1 : 0,
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.085) 24%, rgba(255,255,255,0.04) 52%, rgba(255,255,255,0.012) 70%, rgba(255,255,255,0) 84%)'
            : 'radial-gradient(circle, rgba(38,32,28,0.1) 0%, rgba(38,32,28,0.065) 26%, rgba(38,32,28,0.028) 54%, rgba(38,32,28,0.01) 72%, rgba(38,32,28,0) 86%)',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          opacity: 0,
        }}
      />
      <div
        ref={coreRef}
        className="absolute top-0 left-0 rounded-full will-change-transform"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.14) 22%, rgba(255,255,255,0.05) 48%, rgba(255,255,255,0) 76%)'
            : 'radial-gradient(circle, rgba(42,36,32,0.12) 0%, rgba(42,36,32,0.082) 24%, rgba(42,36,32,0.03) 50%, rgba(42,36,32,0) 78%)',
          mixBlendMode: isDark ? 'screen' : 'multiply',
          opacity: 0,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
