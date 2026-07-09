"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Image as ImageIcon,
  Video,
  Save,
  Loader2,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminAcademyClient() {
  const [view, setView] = useState("courses"); // courses | lessons | edit
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    const res = await fetch("/api/admin/academy/courses");
    const data = await res.json();
    if (data.success) setCourses(data.courses);
    setLoading(false);
  }

  async function fetchModules(courseId) {
    setLoading(true);
    const res = await fetch(`/api/admin/academy/modules?courseId=${courseId}`);
    const data = await res.json();
    if (data.success) setModules(data.modules);
    setLoading(false);
  }

  function selectCourse(course) {
    setSelectedCourse(course);
    fetchModules(course.id);
    setView("lessons");
  }

  function selectLesson(lesson) {
    setSelectedLesson(lesson);
    setView("edit");
  }

  function backToCourses() {
    setView("courses");
    setSelectedCourse(null);
    setModules([]);
  }

  function backToLessons() {
    setView("lessons");
    setSelectedLesson(null);
    // Refresh modules to show updated lessons
    if (selectedCourse) fetchModules(selectedCourse.id);
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Link href="/dashboard/admin" className="hover:text-[#075a01] transition">Admin</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-700 font-semibold">Academy Manager</span>
          {selectedCourse && (
            <>
              <ChevronRight className="h-3 w-3" />
              <button onClick={backToLessons} className="hover:text-[#075a01] transition">
                {selectedCourse.title}
              </button>
            </>
          )}
          {selectedLesson && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-700 font-semibold line-clamp-1">{selectedLesson.title}</span>
            </>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {view === "courses" && "Academy Manager"}
          {view === "lessons" && selectedCourse?.title}
          {view === "edit" && "Edit Lesson"}
        </h1>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
        </div>
      )}

      {/* COURSES VIEW */}
      {!loading && view === "courses" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => selectCourse(course)}
              className="text-left rounded-2xl border border-gray-200 bg-white p-5 hover:border-[#075a01] hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#075a01]/10">
                  <BookOpen className="h-5 w-5 text-[#075a01]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm mb-1">{course.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{course.subtitle}</p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    <span>{course.total_lessons} lessons</span>
                    <span>·</span>
                    <span>{course.duration_hours}h</span>
                    <span>·</span>
                    <span className="text-[#075a01] font-bold">{course.category}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* LESSONS VIEW */}
      {!loading && view === "lessons" && (
        <div>
          <button
            onClick={backToCourses}
            className="mb-4 flex items-center gap-1 text-xs font-bold text-[#075a01] hover:underline"
          >
            <ArrowLeft className="h-3 w-3" /> Back to courses
          </button>

          <div className="space-y-4">
            {modules.map((module, mi) => (
              <div key={module.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-gray-50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#075a01] text-white text-xs font-black">
                    {mi + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{module.title}</p>
                    <p className="text-[10px] text-gray-500">{module.academy_lessons?.length || 0} lessons</p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {(module.academy_lessons || [])
                    .sort((a, b) => a.order_index - b.order_index)
                    .map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => selectLesson(lesson)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 font-medium line-clamp-1">
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                            <span>{lesson.duration_minutes}m</span>
                            {lesson.hero_image && (
                              <span className="text-green-600 font-bold flex items-center gap-1">
                                <ImageIcon className="h-3 w-3" /> Image
                              </span>
                            )}
                            {lesson.video_embed && (
                              <span className="text-red-600 font-bold flex items-center gap-1">
                                <Video className="h-3 w-3" /> Video
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDIT VIEW */}
      {!loading && view === "edit" && selectedLesson && (
        <div>
          <button
            onClick={backToLessons}
            className="mb-4 flex items-center gap-1 text-xs font-bold text-[#075a01] hover:underline"
          >
            <ArrowLeft className="h-3 w-3" /> Back to lessons
          </button>
          <LessonEditor lesson={selectedLesson} onSaved={backToLessons} />
        </div>
      )}
    </>
  );
}

function LessonEditor({ lesson, onSaved }) {
  const [heroImage, setHeroImage] = useState(lesson.hero_image || "");
  const [videoEmbed, setVideoEmbed] = useState(lesson.video_embed || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("lessonId", lesson.id);

    try {
      const res = await fetch("/api/admin/academy/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setHeroImage(data.url);
      } else {
        alert("Upload failed: " + (data.error || "unknown"));
      }
    } catch (e) {
      alert("Upload failed");
    }
    setUploading(false);
  }

  async function handleSave() {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/admin/academy/update-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          hero_image: heroImage,
          video_embed: videoEmbed,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => onSaved(), 1000);
      } else {
        alert("Save failed");
      }
    } catch {
      alert("Save failed");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-4">
        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Editing</p>
        <p className="text-lg font-black text-gray-900">{lesson.title}</p>
        <p className="text-xs text-gray-400 mt-1">
          {lesson.duration_minutes}m · +{lesson.xp_reward} XP
        </p>
      </div>

      {/* HERO IMAGE */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <ImageIcon className="h-4 w-4 text-[#075a01]" />
          <p className="font-bold text-gray-900 text-sm">Hero Image</p>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Upload a compelling image that represents this lesson. Recommended: 1200x630px. Max 5MB.
        </p>

        {heroImage ? (
          <div className="relative rounded-xl overflow-hidden border border-gray-200 mb-3">
            <img src={heroImage} alt="Hero" className="w-full h-64 object-cover" />
            <button
              onClick={() => setHeroImage("")}
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 cursor-pointer hover:border-[#075a01] hover:bg-gray-100 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-[#075a01]" />
                <p className="text-sm text-gray-500">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-gray-400" />
                <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                <p className="text-[10px] text-gray-400">PNG, JPG, WebP up to 5MB</p>
              </>
            )}
          </label>
        )}
      </div>

      {/* VIDEO EMBED */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Video className="h-4 w-4 text-red-500" />
          <p className="font-bold text-gray-900 text-sm">YouTube Video</p>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Paste a YouTube video URL. Students will see it embedded at the top of the lesson.
        </p>
        <input
          type="text"
          value={videoEmbed}
          onChange={(e) => setVideoEmbed(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#075a01] focus:outline-none focus:ring-2 focus:ring-[#075a01]/20"
        />

        {videoEmbed && (
          <a
            href={videoEmbed}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-[#075a01] font-bold hover:underline"
          >
            Preview on YouTube <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving || uploading}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#075a01] px-4 py-3 text-sm font-bold text-white hover:bg-[#0a8f01] disabled:opacity-50 transition"
      >
        {saving ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
        ) : success ? (
          <><CheckCircle2 className="h-4 w-4" /> Saved!</>
        ) : (
          <><Save className="h-4 w-4" /> Save Changes</>
        )}
      </button>
    </div>
  );
}