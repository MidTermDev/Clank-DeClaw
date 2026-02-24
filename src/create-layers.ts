// Generate art layers for each trait variant as 1000x1000 PNGs
// Uses @napi-rs/canvas for programmatic drawing

import { createCanvas, type Canvas, type SKRSContext2D } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { TRAITS, type TraitCategory, type TraitVariant } from "./traits.js";

const SIZE = 1000;
const LAYERS_DIR = join(process.cwd(), "assets", "layers");

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ─── Background drawers ─────────────────────────────────────────────
function drawBackground(ctx: SKRSContext2D, v: TraitVariant) {
  const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
  grad.addColorStop(0, v.colors[0]);
  grad.addColorStop(1, v.colors[1] || v.colors[0]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Subtle grid overlay
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < SIZE; i += 50) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, SIZE); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(SIZE, i); ctx.stroke();
  }
}

// ─── Body drawers ───────────────────────────────────────────────────
function drawBody(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, cy = 520;
  // Main body rectangle
  ctx.fillStyle = v.colors[0];
  roundRect(ctx, cx - 180, cy - 200, 360, 380, 30);
  ctx.fill();
  // Highlight
  ctx.fillStyle = v.colors[1] || v.colors[0];
  roundRect(ctx, cx - 160, cy - 180, 140, 180, 20);
  ctx.fill();
  // Shadow edge
  ctx.fillStyle = v.colors[2] || "rgba(0,0,0,0.3)";
  roundRect(ctx, cx + 20, cy - 180, 140, 180, 20);
  ctx.fill();
  // Belly panel
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  roundRect(ctx, cx - 100, cy + 40, 200, 100, 15);
  ctx.fill();
  // Bolts
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  for (const [bx, by] of [[cx - 150, cy - 170], [cx + 150, cy - 170], [cx - 150, cy + 150], [cx + 150, cy + 150]]) {
    ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2); ctx.fill();
  }
}

// ─── Chassis drawers ────────────────────────────────────────────────
function drawChassis(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, cy = 520;
  ctx.strokeStyle = v.colors[0];
  ctx.lineWidth = 4;

  switch (v.name) {
    case "Standard Box":
      ctx.strokeRect(cx - 195, cy - 215, 390, 410);
      // Corner brackets
      drawCornerBrackets(ctx, cx - 195, cy - 215, 390, 410, 25);
      break;
    case "Rounded":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 195, 205, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "Hexagonal":
      drawPolygon(ctx, cx, cy, 210, 6);
      ctx.stroke();
      break;
    case "Spiked":
      ctx.strokeRect(cx - 195, cy - 215, 390, 410);
      // Spikes
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const sx = cx + Math.cos(angle) * 195;
        const sy = cy + Math.sin(angle) * 210;
        const ex = cx + Math.cos(angle) * 240;
        const ey = cy + Math.sin(angle) * 250;
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
      }
      break;
    case "Sleek":
      ctx.beginPath();
      ctx.moveTo(cx, cy - 220);
      ctx.bezierCurveTo(cx + 200, cy - 180, cx + 200, cy + 180, cx, cy + 220);
      ctx.bezierCurveTo(cx - 200, cy + 180, cx - 200, cy - 180, cx, cy - 220);
      ctx.stroke();
      break;
    case "Bulky Tank":
      ctx.lineWidth = 6;
      ctx.strokeRect(cx - 210, cy - 230, 420, 440);
      ctx.strokeRect(cx - 200, cy - 220, 400, 420);
      break;
    case "Skeletal":
      // Wireframe look
      ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const offset = i * 8;
        ctx.strokeRect(cx - 195 + offset, cy - 215 + offset, 390 - offset * 2, 410 - offset * 2);
      }
      break;
  }
}

// ─── Claw drawers ───────────────────────────────────────────────────
function drawClaw(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, top = 100;
  // Arm extending from top
  ctx.strokeStyle = v.colors[0];
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, top + 80); ctx.stroke();

  // Cable housing
  ctx.fillStyle = "#444";
  roundRect(ctx, cx - 25, top + 60, 50, 40, 8);
  ctx.fill();

  ctx.fillStyle = v.colors[0];
  ctx.strokeStyle = v.colors[1] || v.colors[0];
  ctx.lineWidth = 4;

  switch (v.name) {
    case "Classic Tri-Claw":
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        drawClawFinger(ctx, cx, top + 100, angle, 60, v.colors[0]);
      }
      break;
    case "Pincer":
      drawClawFinger(ctx, cx, top + 100, -Math.PI / 3, 70, v.colors[0]);
      drawClawFinger(ctx, cx, top + 100, -Math.PI * 2 / 3, 70, v.colors[0]);
      break;
    case "Magnet":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.arc(cx, top + 120, 30, 0, Math.PI, false);
      ctx.fill();
      ctx.fillStyle = v.colors[1];
      ctx.fillRect(cx - 30, top + 120, 15, 40);
      ctx.fillStyle = v.colors[0];
      ctx.fillRect(cx + 15, top + 120, 15, 40);
      break;
    case "Suction Cup":
      ctx.beginPath();
      ctx.ellipse(cx, top + 130, 35, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(cx, top + 130, 25, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fill();
      break;
    case "Laser Grip":
      drawClawFinger(ctx, cx, top + 100, -Math.PI / 3, 55, v.colors[0]);
      drawClawFinger(ctx, cx, top + 100, -Math.PI * 2 / 3, 55, v.colors[0]);
      // Laser beam
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(cx, top + 130); ctx.lineTo(cx, top + 250); ctx.stroke();
      ctx.setLineDash([]);
      break;
    case "Chain Hook":
      // Chain links
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = v.colors[0];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(cx, top + 100 + i * 20, 8, 12, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Hook
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(cx, top + 190, 15, 0, Math.PI, false);
      ctx.stroke();
      break;
    case "Tentacle":
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx, top + 100);
      ctx.bezierCurveTo(cx + 40, top + 140, cx - 40, top + 180, cx + 20, top + 220);
      ctx.stroke();
      // Suckers
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = v.colors[1];
        ctx.beginPath();
        ctx.arc(cx + (i % 2 ? 10 : -10), top + 130 + i * 30, 5, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case "Buzz Saw":
      ctx.fillStyle = v.colors[0];
      drawPolygon(ctx, cx, top + 130, 30, 12);
      ctx.fill();
      ctx.fillStyle = v.colors[1];
      ctx.beginPath();
      ctx.arc(cx, top + 130, 12, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "Frost Claw":
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        drawClawFinger(ctx, cx, top + 100, angle, 55, v.colors[0]);
      }
      // Ice crystals
      ctx.fillStyle = v.colors[1];
      for (let i = 0; i < 5; i++) {
        const ax = cx + (Math.random() - 0.5) * 80;
        const ay = top + 100 + Math.random() * 60;
        drawDiamond(ctx, ax, ay, 6);
      }
      break;
    case "Phantom":
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3 - Math.PI / 2;
        drawClawFinger(ctx, cx, top + 100, angle, 60, v.colors[0]);
      }
      ctx.globalAlpha = 1;
      break;
  }
}

// ─── Visor drawers ──────────────────────────────────────────────────
function drawVisor(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, cy = 420;

  switch (v.name) {
    case "LED Strip":
      ctx.fillStyle = v.colors[0];
      roundRect(ctx, cx - 120, cy - 15, 240, 30, 15);
      ctx.fill();
      // Glow
      ctx.shadowColor = v.colors[0];
      ctx.shadowBlur = 20;
      roundRect(ctx, cx - 120, cy - 15, 240, 30, 15);
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    case "Mono Eye":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx - 8, cy - 8, 8, 0, Math.PI * 2);
      ctx.fill();
      // Glow
      ctx.shadowColor = v.colors[0];
      ctx.shadowBlur = 25;
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      break;
    case "Dual Lens":
      for (const offset of [-50, 50]) {
        ctx.fillStyle = v.colors[0];
        ctx.beginPath();
        ctx.arc(cx + offset, cy, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = v.colors[1];
        ctx.beginPath();
        ctx.arc(cx + offset, cy, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      // Bridge
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx - 25, cy); ctx.lineTo(cx + 25, cy); ctx.stroke();
      break;
    case "X-Ray":
      ctx.fillStyle = v.colors[0];
      roundRect(ctx, cx - 100, cy - 20, 200, 40, 10);
      ctx.fill();
      // Scan lines
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 10; i++) {
        const x = cx - 90 + i * 20;
        ctx.beginPath(); ctx.moveTo(x, cy - 15); ctx.lineTo(x, cy + 15); ctx.stroke();
      }
      break;
    case "Pixel Grid":
      const pixelSize = 12;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 10; col++) {
          ctx.fillStyle = (row + col) % 3 === 0 ? v.colors[0] : v.colors[1];
          ctx.fillRect(cx - 65 + col * pixelSize + col * 2, cy - 20 + row * pixelSize + row * 2, pixelSize, pixelSize);
        }
      }
      break;
    case "Cyclops":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = v.colors[1];
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "Stealth":
      ctx.fillStyle = v.colors[0];
      roundRect(ctx, cx - 100, cy - 12, 200, 24, 12);
      ctx.fill();
      ctx.fillStyle = v.colors[1];
      ctx.beginPath();
      ctx.arc(cx - 40, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 40, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "Holo Display":
      ctx.fillStyle = "rgba(0,255,255,0.3)";
      roundRect(ctx, cx - 110, cy - 40, 220, 80, 10);
      ctx.fill();
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 2;
      roundRect(ctx, cx - 110, cy - 40, 220, 80, 10);
      ctx.stroke();
      // Data lines
      ctx.strokeStyle = v.colors[1];
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const y = cy - 25 + i * 12;
        const w = 60 + Math.sin(i) * 40;
        ctx.beginPath(); ctx.moveTo(cx - w / 2, y); ctx.lineTo(cx + w / 2, y); ctx.stroke();
      }
      break;
  }
}

// ─── Accessory drawers ──────────────────────────────────────────────
function drawAccessory(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, top = 290;

  switch (v.name) {
    case "None":
      break;
    case "Antenna":
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx, top); ctx.lineTo(cx, top - 60); ctx.stroke();
      ctx.fillStyle = v.colors[0];
      ctx.beginPath(); ctx.arc(cx, top - 65, 8, 0, Math.PI * 2); ctx.fill();
      // Glow
      ctx.shadowColor = v.colors[0];
      ctx.shadowBlur = 15;
      ctx.beginPath(); ctx.arc(cx, top - 65, 8, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      break;
    case "Hard Hat":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.ellipse(cx, top - 10, 130, 40, 0, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(cx - 130, top - 15, 260, 15);
      break;
    case "Crown":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.moveTo(cx - 80, top);
      ctx.lineTo(cx - 80, top - 40);
      ctx.lineTo(cx - 50, top - 20);
      ctx.lineTo(cx - 20, top - 50);
      ctx.lineTo(cx, top - 30);
      ctx.lineTo(cx + 20, top - 50);
      ctx.lineTo(cx + 50, top - 20);
      ctx.lineTo(cx + 80, top - 40);
      ctx.lineTo(cx + 80, top);
      ctx.closePath();
      ctx.fill();
      // Jewels
      ctx.fillStyle = v.colors[2] || "#ff4500";
      ctx.beginPath(); ctx.arc(cx, top - 30, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = v.colors[1];
      ctx.beginPath(); ctx.arc(cx - 40, top - 22, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 40, top - 22, 4, 0, Math.PI * 2); ctx.fill();
      break;
    case "Headphones":
      ctx.fillStyle = v.colors[0];
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx, top - 30, 120, Math.PI + 0.3, -0.3);
      ctx.stroke();
      // Ear cups
      for (const offset of [-120, 120]) {
        ctx.fillStyle = v.colors[0];
        roundRect(ctx, cx + offset - 20, top - 20, 40, 50, 10);
        ctx.fill();
        ctx.fillStyle = v.colors[1];
        ctx.beginPath(); ctx.arc(cx + offset, top + 5, 10, 0, Math.PI * 2); ctx.fill();
      }
      break;
    case "Halo":
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 6;
      ctx.shadowColor = v.colors[1];
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.ellipse(cx, top - 40, 90, 20, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      break;
    case "Mohawk":
      ctx.fillStyle = v.colors[0];
      for (let i = 0; i < 7; i++) {
        const x = cx - 60 + i * 20;
        const h = 40 + Math.sin(i * 0.8) * 20;
        ctx.beginPath();
        ctx.moveTo(x - 8, top);
        ctx.lineTo(x, top - h);
        ctx.lineTo(x + 8, top);
        ctx.closePath();
        ctx.fill();
      }
      break;
    case "Satellite Dish":
      ctx.fillStyle = v.colors[0];
      ctx.beginPath();
      ctx.ellipse(cx + 100, top - 30, 50, 30, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = v.colors[1];
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx + 100, top - 30); ctx.lineTo(cx + 80, top); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 80, top); ctx.lineTo(cx + 60, top + 10); ctx.stroke();
      break;
  }
}

// ─── Aura drawers ───────────────────────────────────────────────────
function drawAura(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, cy = 520;

  switch (v.name) {
    case "None":
      break;
    case "Electric Sparks":
      ctx.strokeStyle = v.colors[0];
      ctx.lineWidth = 2;
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const r1 = 220 + Math.random() * 20;
        const r2 = r1 + 20 + Math.random() * 30;
        const x1 = cx + Math.cos(angle) * r1;
        const y1 = cy + Math.sin(angle) * r1;
        const x2 = cx + Math.cos(angle + 0.1) * r2;
        const y2 = cy + Math.sin(angle + 0.1) * r2;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      break;
    case "Fire Ring":
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const r = 230;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const colorIdx = i % v.colors.length;
        ctx.fillStyle = v.colors[colorIdx];
        ctx.globalAlpha = 0.6;
        ctx.beginPath(); ctx.arc(x, y, 10 + Math.random() * 8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    case "Frost Mist":
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < 30; i++) {
        const x = cx + (Math.random() - 0.5) * 500;
        const y = cy + (Math.random() - 0.5) * 500;
        ctx.fillStyle = v.colors[i % 2];
        ctx.beginPath(); ctx.arc(x, y, 20 + Math.random() * 30, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      break;
    case "Shadow Wisps":
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const r = 240;
        ctx.strokeStyle = v.colors[i % 2];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * 200, cy + Math.sin(angle) * 200);
        ctx.bezierCurveTo(
          cx + Math.cos(angle + 0.2) * r, cy + Math.sin(angle + 0.2) * r,
          cx + Math.cos(angle + 0.4) * (r + 30), cy + Math.sin(angle + 0.4) * (r + 30),
          cx + Math.cos(angle + 0.5) * (r + 50), cy + Math.sin(angle + 0.5) * (r + 50)
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    case "Rainbow":
      ctx.lineWidth = 3;
      for (let i = 0; i < v.colors.length; i++) {
        ctx.strokeStyle = v.colors[i];
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 220 + i * 8, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      break;
    case "Glitch":
      for (let i = 0; i < 15; i++) {
        const x = cx + (Math.random() - 0.5) * 500;
        const y = cy + (Math.random() - 0.5) * 500;
        ctx.fillStyle = v.colors[i % 3];
        ctx.globalAlpha = 0.3;
        ctx.fillRect(x, y, 20 + Math.random() * 40, 3);
      }
      ctx.globalAlpha = 1;
      break;
  }
}

// ─── Expression drawers ─────────────────────────────────────────────
function drawExpression(ctx: SKRSContext2D, v: TraitVariant) {
  const cx = 500, cy = 470;

  ctx.strokeStyle = v.colors[0];
  ctx.lineWidth = 3;
  ctx.fillStyle = v.colors[0];

  switch (v.name) {
    case "Neutral":
      ctx.beginPath(); ctx.moveTo(cx - 40, cy); ctx.lineTo(cx + 40, cy); ctx.stroke();
      break;
    case "Happy":
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 40, 0.1, Math.PI - 0.1);
      ctx.stroke();
      break;
    case "Angry":
      ctx.beginPath();
      ctx.arc(cx, cy + 20, 40, Math.PI + 0.2, -0.2);
      ctx.stroke();
      // Angry brows
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx - 60, cy - 50); ctx.lineTo(cx - 20, cy - 40); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 60, cy - 50); ctx.lineTo(cx + 20, cy - 40); ctx.stroke();
      break;
    case "Confused":
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy);
      ctx.bezierCurveTo(cx - 10, cy - 15, cx + 10, cy + 15, cx + 30, cy);
      ctx.stroke();
      // Question mark
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("?", cx + 60, cy - 20);
      break;
    case "Sleepy":
      // Droopy mouth
      ctx.beginPath(); ctx.moveTo(cx - 25, cy); ctx.lineTo(cx + 25, cy); ctx.stroke();
      // Z's
      ctx.font = "bold 20px sans-serif";
      ctx.globalAlpha = 0.7;
      ctx.fillText("Z", cx + 80, cy - 60);
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("z", cx + 100, cy - 80);
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("z", cx + 112, cy - 95);
      ctx.globalAlpha = 1;
      break;
    case "Excited":
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.stroke();
      // Exclamation marks
      ctx.font = "bold 24px sans-serif";
      ctx.fillText("!", cx + 60, cy - 20);
      ctx.fillText("!", cx - 70, cy - 20);
      break;
    case "Menacing":
      // Jagged mouth
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy);
      for (let i = 0; i < 8; i++) {
        const x = cx - 50 + i * 14;
        const y = i % 2 === 0 ? cy : cy + 15;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(cx + 50, cy);
      ctx.stroke();
      // Glow eyes
      ctx.shadowColor = v.colors[1] || v.colors[0];
      ctx.shadowBlur = 15;
      ctx.fillStyle = v.colors[0];
      ctx.beginPath(); ctx.arc(cx - 40, cy - 50, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + 40, cy - 50, 6, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      break;
  }
}

// ─── Helpers ────────────────────────────────────────────────────────
function roundRect(ctx: SKRSContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPolygon(ctx: SKRSContext2D, cx: number, cy: number, r: number, sides: number) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawClawFinger(ctx: SKRSContext2D, cx: number, cy: number, angle: number, length: number, color: string) {
  const tipX = cx + Math.cos(angle) * length;
  const tipY = cy + Math.sin(angle) * length;
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(tipX, tipY); ctx.stroke();
  // Claw tip
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(tipX, tipY, 5, 0, Math.PI * 2); ctx.fill();
}

function drawDiamond(ctx: SKRSContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
}

function drawCornerBrackets(ctx: SKRSContext2D, x: number, y: number, w: number, h: number, len: number) {
  const corners = [
    [x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1],
  ];
  ctx.lineWidth = 3;
  for (const [cx, cy, dx, dy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx + dx * len, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + dy * len);
    ctx.stroke();
  }
}

// ─── Drawer map ─────────────────────────────────────────────────────
const DRAWERS: Record<string, (ctx: SKRSContext2D, v: TraitVariant) => void> = {
  Background: drawBackground,
  Body: drawBody,
  Chassis: drawChassis,
  Claw: drawClaw,
  Visor: drawVisor,
  Accessory: drawAccessory,
  Aura: drawAura,
  Expression: drawExpression,
};

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log("Creating art layers...");
  let count = 0;

  for (const category of TRAITS) {
    const catDir = join(LAYERS_DIR, category.name);
    ensureDir(catDir);

    const drawer = DRAWERS[category.name];
    if (!drawer) {
      console.warn(`No drawer for ${category.name}, skipping`);
      continue;
    }

    for (const variant of category.variants) {
      const canvas = createCanvas(SIZE, SIZE);
      const ctx = canvas.getContext("2d");

      // Clear with transparent background (except for Background layer)
      if (category.name !== "Background") {
        ctx.clearRect(0, 0, SIZE, SIZE);
      }

      drawer(ctx, variant);

      const outPath = join(catDir, `${variant.name}.png`);
      const buf = canvas.toBuffer("image/png");
      writeFileSync(outPath, buf);
      count++;
    }

    console.log(`  ${category.name}: ${category.variants.length} variants`);
  }

  console.log(`\nDone! Created ${count} layer PNGs in ${LAYERS_DIR}`);
}

main().catch(console.error);
