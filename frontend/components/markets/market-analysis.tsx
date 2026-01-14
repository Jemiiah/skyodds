"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  Bot,
  FileText,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Define the shape of the AI response
interface AnalysisReport {
  summary: string;
  mostLikelyOutcome: string;
  confidenceScore: number;
  keyFactors: string[];
  recommendation: string;
}

interface MarketAnalysisProps {
  flightNumber: string;
  route: string;
  departureTime: string;
  // We assume marketData contains the prices/odds
  marketData: {
    prices: {
      onTime: number;
      delayed30: number;
      delayed120: number;
      cancelled: number;
    };
  };
  isResolved?: boolean;
}

export function MarketAnalysis({
  flightNumber,
  route,
  departureTime,
  marketData,
  isResolved = false,
}: MarketAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setReport(null);

    try {
      // 1. Structure the data to match what the API expects
      const payload = {
        flightNumber,
        route,
        departureTime,
        odds: marketData.prices, // Map 'marketData.prices' to 'odds'
      };

      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      // 2. The API returns a JSON object, not just a string
      const data = await response.json();
      setReport(data); // Store the full object
      toast.success("Analysis generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-zinc-900">AI Flight Analyst</h3>
        </div>
        {!report && (
          <Button
            onClick={handleGenerateReport}
            disabled={isLoading || isResolved}
            variant="outline"
            size="sm"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        )}
      </div>

      {/* Initial State */}
      {!report && !isLoading && (
        <div className="text-zinc-500 text-sm bg-zinc-50 p-4 rounded-lg border border-zinc-100">
          <p>
            Click "Generate Report" to get a real-time risk assessment for{" "}
            <span className="font-semibold text-zinc-700">{flightNumber}</span>{" "}
            using Gemini AI.
          </p>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          <div className="flex justify-between">
            <div className="h-16 bg-zinc-100 rounded w-1/3"></div>
            <div className="h-16 bg-zinc-100 rounded w-1/3"></div>
          </div>
          <div className="h-24 bg-zinc-100 rounded w-full"></div>
          <div className="h-4 bg-zinc-100 rounded w-2/3"></div>
        </div>
      )}

      {/* Analysis Report */}
      {report && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Top Row: Score & Outcome */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Confidence
              </p>
              <p
                className={cn(
                  "text-2xl font-mono font-bold",
                  report.confidenceScore > 70
                    ? "text-emerald-600"
                    : report.confidenceScore > 40
                      ? "text-amber-600"
                      : "text-red-600"
                )}
              >
                {report.confidenceScore}%
              </p>
            </div>
            <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100 text-right">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Prediction
              </p>
              <Badge
                variant="outline"
                className="bg-white mt-1 border-zinc-300 text-zinc-900"
              >
                {report.mostLikelyOutcome}
              </Badge>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex gap-3">
            <TrendingUp className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-indigo-800 uppercase mb-1">
                Trading Signal
              </p>
              <p className="text-sm text-indigo-900 font-medium leading-snug">
                {report.recommendation}
              </p>
            </div>
          </div>

          {/* Text Analysis */}
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
              Analysis Summary
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {report.summary}
            </p>
          </div>

          {/* Key Factors */}
          <div>
            <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">
              Key Factors
            </h4>
            <ul className="space-y-2">
              {report.keyFactors.map((factor, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-zinc-600"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2 border-t border-zinc-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGenerateReport}
              className="text-zinc-400 hover:text-black text-xs"
            >
              <FileText className="w-3 h-3 mr-1" /> Regenerate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
