"use client";

import { SiteNav } from "@/components/site-nav";

const navLinks = [
  { label: "Pathways", href: "/paths" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Challenges", href: "/paths/frontend/5" },
  { label: "Shop", href: "#" },
];

interface QuestHeaderProps {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  title: string;
  description: string;
  xpReward: number;
  step: number;
  totalSteps: number;
  progress: number;
}

export function QuestHeader({
  difficulty,
  title,
  description,
  xpReward,
  step,
  totalSteps,
  progress,
}: QuestHeaderProps) {
  const difficultyColors = {
    EASY: "text-green-400",
    MEDIUM: "text-yellow-400",
    HARD: "text-red-400",
  };

  const difficultyDotColors = {
    EASY: "bg-green-500",
    MEDIUM: "bg-yellow-500",
    HARD: "bg-red-500",
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1f35] to-[#0f1320] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">
        {/* Difficulty Badge */}
        <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
          <span
            className={`w-2 h-2 ${difficultyDotColors[difficulty]} rounded-full animate-pulse`}
          />
          <span
            className={`${difficultyColors[difficulty]} text-xs font-semibold tracking-wider uppercase`}
          >
            Difficulty: {difficulty}
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6">
          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black italic mb-3 sm:mb-4 text-white tracking-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* XP Reward Badge */}
          <div className="w-full lg:w-auto flex-shrink-0 bg-blue-600/20 border border-blue-500/50 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-center backdrop-blur-sm">
            <div className="text-xs text-blue-400 font-semibold mb-1 uppercase tracking-wider">
              Potential Reward
            </div>
            <div className="text-3xl sm:text-4xl font-black">
              <span className="text-white">{xpReward}</span>
              <span className="text-blue-400 ml-1">XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-500 uppercase tracking-wider font-semibold">
              Step {step} of {totalSteps}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { getProgress } from "@/lib/getProgress";
import { useAuthStore } from "@/store/authStore";

interface TaskSubmissionProps {
  defaultGithubUrl?: string;
  defaultNotes?: string;
  onSubmit?: (data: { githubUrl: string; notes: string }) => void;
  onSaveDraft?: (data: { githubUrl: string; notes: string }) => void;
  isLoading?: boolean;
  userTask?: any
}

export function TaskSubmission({
  defaultGithubUrl = "",
  defaultNotes = "",
  onSubmit,
  onSaveDraft,
  isLoading = false,
  userTask
}: TaskSubmissionProps) {
  const [githubUrl, setGithubUrl] = useState(defaultGithubUrl);
  const [notes, setNotes] = useState(defaultNotes);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ githubUrl, notes });
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({ githubUrl, notes });
    }
  };

  return (
    <div className="bg-[#1a1f35] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-800">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
        <h2 className="text-xl sm:text-2xl font-black italic text-white">
          TASK SUBMISSION
        </h2>
      </div>

      {/* GitHub URL Input */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
          GitHub Repository URL
        </label>
        <div className="relative">
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <input
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            disabled={isLoading || userTask && userTask.status === "APPROVED"}
            className="w-full bg-[#0f1320] border border-gray-700 rounded-lg pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="https://github.com/username/react-patterns-challenge"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Ensure your repository is set to public or shared with the Level-Up
          mentor account.
        </p>
      </div>

      {/* Additional Notes */}
      <div className="mb-6 sm:mb-8">
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
          Additional Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={isLoading || userTask && userTask.status === "APPROVED"}
          className="w-full bg-[#0f1320] border border-gray-700 rounded-lg px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none h-28 sm:h-32 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Describe any specific challenges you faced or unique solutions you implemented..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !githubUrl.trim() || userTask &&  userTask.status === "APPROVED"}
          className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-sm sm:text-base"
        >
          <span className="tracking-wide">{userTask ? "APPROVE YOURSELF" : "SUBMIT FOR REVIEW"}</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={isLoading  || userTask &&  userTask.status === "APPROVED"}
          className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 text-sm sm:text-base"
        >
          SAVE DRAFT
        </button>
      </div>
    </div>
  );
}

function getCurrProgress(currentStep: number, totalSteps: number) {
  return ((currentStep) / totalSteps) * 100;
}

export default function SubmitPage() {
    const {slug, order, submitorder} = useParams()

    const [task, setTask] = useState([])

    useEffect(() => {
        api.get(`/path/${slug}/${order}/${submitorder}`)
            .then(res => {
                setTask(res.data.data)
            })
    }, [])

    const [userTask, setUserTask] = useState(null)
    useEffect(() => {
        if(!task) return
        api.get(`/path/getUserTask/${task.id}`)
            .then(res => {
                setUserTask(res.data.data)
            })
    }, [task])

      useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        useAuthStore.getState().setUser(res.data.data);
      })
      .catch(() => {
        useAuthStore.getState().setUser(null);
      });
  }, []);

    const progress = getCurrProgress(Number(submitorder), 5)

    const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: {
    githubUrl: string;
    notes: string;
  }) => {
    try {
      setIsLoading(true);

      const res = await api.post(`/submit/${task.id}`, {
        repoUrl: data.githubUrl,
        notes: data.notes,
      });

    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
        setIsLoading(true)

        api.post(`/submit/approve/${userTask.id}`)
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteNav links={navLinks} showStreak streak={12} showXP xp={2450} />
      <main className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="space-y-6 sm:space-y-8">
          <QuestHeader
            difficulty={task.difficulty ? task.difficulty : "WAIT"}
            title={task.title ? task.title.toUpperCase() : "loading..."}
            description={task.description ? task.description : "loading..."}
            xpReward={100}
            step={submitorder}
            totalSteps={5}
            progress={progress}
          />
          {!userTask && <TaskSubmission
            defaultGithubUrl="https://github.com/username/react-patterns-challenge"
            defaultNotes=""
              onSubmit={handleSubmit}
            //   onSaveDraft={handleSaveDraft}
            isLoading={isLoading}
          />}

          {userTask && 
                    <TaskSubmission
            defaultGithubUrl="https://github.com/username/react-patterns-challenge"
            defaultNotes=""
              onSubmit={handleApprove}
            //   onSaveDraft={handleSaveDraft}
            isLoading={isLoading}
            userTask={userTask}
          />
          }
        </div>
      </main>
    </div>
  );
}