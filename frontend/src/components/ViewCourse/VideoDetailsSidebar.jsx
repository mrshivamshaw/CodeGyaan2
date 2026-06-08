import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Star,
} from "lucide-react";

import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { markLectureAsComplete } from "../../servies/operations/courseOpertaions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function VideoDetailsSidebar({ setReviewModal, open, setOpen }) {
  const [activeSection, setActiveSection] = useState("");
  const [activeVideo, setActiveVideo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { sectionId, subSectionId, courseId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData.length) return;
    const secIdx = courseSectionData.findIndex((d) => d._id === sectionId);
    const subIdx = courseSectionData?.[secIdx]?.subSection.findIndex(
      (d) => d._id === subSectionId
    );
    setActiveSection(courseSectionData?.[secIdx]?._id);
    setActiveVideo(courseSectionData[secIdx]?.subSection?.[subIdx]?._id);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const onComplete = async (cid, subId) => {
    const res = await markLectureAsComplete({
      courseId: cid,
      subSectionId: subId,
      id: localStorage.getItem("id"),
    });
    if (res) dispatch(updateCompletedLectures(subId));
  };

  if (!open) {
    return (
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-12 shrink-0 border-r border-border bg-card/40 lg:flex lg:flex-col lg:items-center lg:py-4">
        <button
          onClick={() => setOpen(true)}
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
          aria-label="Open sidebar"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </aside>
    );
  }

  const pct = totalNoOfLectures
    ? Math.round((completedLectures.length / totalNoOfLectures) * 100)
    : 0;

  return (
    <aside className="sticky top-16 z-10 h-auto w-full shrink-0 border-r border-border bg-card/60 backdrop-blur lg:h-[calc(100vh-4rem)] lg:w-[340px]">
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Collapse"
            >
              <ChevronLeft className="hidden h-4 w-4 lg:block" />
              <ChevronDown className="block h-4 w-4 lg:hidden" />
            </button>
            <Button size="sm" onClick={() => setReviewModal(true)}>
              <Star className="h-3.5 w-3.5" /> Add review
            </Button>
          </div>

          <p className="mt-4 text-base font-semibold text-foreground">
            {courseEntireData?.courseDetails?.courseName}
          </p>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {completedLectures.length} / {totalNoOfLectures} lectures
              </span>
              <span className="font-medium text-foreground">{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-amber-300 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {courseSectionData.map((section) => (
            <div key={section._id} className="mb-2">
              <button
                onClick={() => setActiveSection(section._id)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
              >
                <span className="truncate">{section.sectionName}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    activeSection === section._id && "rotate-180"
                  )}
                />
              </button>
              {activeSection === section._id && (
                <ul className="mt-1 flex flex-col gap-0.5">
                  {section.subSection.map((topic) => {
                    const done = completedLectures.includes(topic._id);
                    const active = activeVideo === topic._id;
                    return (
                      <li key={topic._id}>
                        <button
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?.courseDetails?._id}/section/${section._id}/sub-section/${topic._id}`
                            );
                            setActiveVideo(topic._id);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                          )}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onComplete(courseId, topic._id);
                            }}
                            className="shrink-0"
                          >
                            {done ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                          <span className="truncate">{topic.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
