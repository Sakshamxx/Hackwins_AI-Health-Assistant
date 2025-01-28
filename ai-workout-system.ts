// File: app/lib/ai/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateWorkout(userPreferences: {
  level: string;
  goals: string[];
  equipment: string[];
  duration: number;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a professional fitness coach creating personalized workout plans."
      },
      {
        role: "user",
        content: `Create a workout plan for a ${userPreferences.level} level user with the following goals: ${userPreferences.goals.join(
          ", "
        )}. Available equipment: ${userPreferences.equipment.join(
          ", "
        )}. Workout duration: ${userPreferences.duration} minutes.`
      }
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}

// File: app/lib/pose-detection/PoseDetector.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { motion } from 'framer-motion';

export function PoseDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detector, setDetector] = useState<poseDetection.PoseDetector | null>(null);
  const [poses, setPoses] = useState<poseDetection.Pose[]>([]);

  useEffect(() => {
    async function initPoseDetection() {
      await tf.ready();
      const model = poseDetection.SupportedModels.BlazePose;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full'
      };
      const detector = await poseDetection.createDetector(model, detectorConfig);
      setDetector(detector);
    }

    initPoseDetection();
  }, []);

  useEffect(() => {
    async function enableCamera() {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }

    enableCamera();
  }, []);

  useEffect(() => {
    if (!detector || !videoRef.current) return;

    async function detectPose() {
      const video = videoRef.current;
      if (!video || video.readyState < 2) return;

      const poses = await detector.estimatePoses(video);
      setPoses(poses);

      requestAnimationFrame(detectPose);
    }

    detectPose();
  }, [detector]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="rounded-lg"
        autoPlay
        playsInline
        width="640"
        height="480"
      />
      <svg
        className="absolute top-0 left-0"
        width="640"
        height="480"
        viewBox="0 0 640 480"
      >
        {poses.map((pose, index) =>
          pose.keypoints.map((keypoint, idx) => (
            <motion.circle
              key={`${index}-${idx}`}
              cx={keypoint.x}
              cy={keypoint.y}
              r="4"
              fill={keypoint.score > 0.3 ? "#00ff00" : "#ff0000"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
          ))
        )}
      </svg>
    </div>
  );
}
