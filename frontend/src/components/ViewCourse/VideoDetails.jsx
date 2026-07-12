import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../servies/operations/courseOpertaions.js";
import { updateCompletedLectures } from "../../slices/viewCourseSlice.js";
import { Button } from "@/components/ui/button";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState({});
  const [previewSource, setPreviewSource] = useState("");
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }
      const section = courseSectionData.find((s) => s._id === sectionId);
      const sub = section?.subSection?.find((d) => d._id === subSectionId);
      setVideoData(sub || {});
      setPreviewSource(courseEntireData.thumbnail);
      setEnded(false);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirst = () => {
    const si = courseSectionData.findIndex((d) => d._id === sectionId);
    const subi = courseSectionData[si]?.subSection.findIndex(
      (d) => d._id === subSectionId
    );
    return si === 0 && subi === 0;
  };

  const isLast = () => {
    const si = courseSectionData.findIndex((d) => d._id === sectionId);
    const subi = courseSectionData[si]?.subSection.findIndex(
      (d) => d._id === subSectionId
    );
    const total = courseSectionData[si]?.subSection.length;
    return si === courseSectionData.length - 1 && subi === total - 1;
  };

  const goNext = () => {
    const si = courseSectionData.findIndex((d) => d._id === sectionId);
    const total = courseSectionData[si].subSection.length;
    const subi = courseSectionData[si].subSection.findIndex(
      (d) => d._id === subSectionId
    );
    if (subi !== total - 1) {
      const next = courseSectionData[si].subSection[subi + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${next}`);
    } else {
      const nSec = courseSectionData[si + 1]._id;
      const nSub = courseSectionData[si + 1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nSec}/sub-section/${nSub}`);
    }
  };

  const goPrev = () => {
    const si = courseSectionData.findIndex((d) => d._id === sectionId);
    const subi = courseSectionData[si].subSection.findIndex(
      (d) => d._id === subSectionId
    );
    if (subi !== 0) {
      const prev = courseSectionData[si].subSection[subi - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prev}`);
    } else {
      const pSec = courseSectionData[si - 1]._id;
      const len = courseSectionData[si - 1].subSection.length;
      const pSub = courseSectionData[si - 1].subSection[len - 1]._id;
      navigate(`/view-course/${courseId}/section/${pSec}/sub-section/${pSub}`);
    }
  };

  const markComplete = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      {
        courseId,
        subsectionId: subSectionId,
        id: localStorage.getItem("id"),
      },
      token
    );
    if (res) dispatch(updateCompletedLectures(subSectionId));
    setLoading(false);
  };

  return (
    <div className="container-page py-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-black shadow-2xl shadow-black/40">
        {!videoData?.videoUrl ? (
          <img
            src={previewSource}
            alt=""
            className="aspect-video w-full object-cover"
          />
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setEnded(true)}
            src={videoData.videoUrl}
          >
            <BigPlayButton position="center" />
            {ended && (
              <div className="full absolute inset-0 z-[100] grid place-items-center bg-gradient-to-t from-black via-black/85 to-black/30">
                <div className="flex flex-col items-center gap-4 p-6">
                  {!completedLectures.includes(subSectionId) && (
                    <Button size="lg" onClick={markComplete} disabled={loading}>
                      <CheckCircle2 className="h-4 w-4" />
                      {loading ? "Saving…" : "Mark as completed"}
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      playerRef.current?.seek(0);
                      setEnded(false);
                    }}
                  >
                    <RotateCcw className="h-4 w-4" /> Rewatch
                  </Button>
                </div>
              </div>
            )}
          </Player>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {videoData?.title}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goPrev}
              disabled={loading || isFirst()}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button size="sm" onClick={goNext} disabled={loading || isLast()}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {videoData?.description}
        </p>
        {!completedLectures.includes(subSectionId) && (
          <Button
            variant="outline"
            onClick={markComplete}
            disabled={loading}
            className="w-fit"
          >
            <CheckCircle2 className="h-4 w-4" />
            {loading ? "Marking…" : "Mark as completed"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
