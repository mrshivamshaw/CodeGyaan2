import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronDown,
  Pencil,
  Trash2,
  Plus,
  PlayCircle,
  Layers,
} from "lucide-react";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../servies/operations/courseOpertaions.js";
import { setCourse } from "../../../../../slices/courseSlice.js";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((s) => s.course);
  const { token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const onDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    if (result) dispatch(setCourse(result));
    setConfirm(null);
  };

  const onDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updated = course.courseContent.map((s) =>
        s._id === sectionId ? result : s
      );
      dispatch(setCourse({ ...course, courseContent: updated }));
    }
    setConfirm(null);
  };

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-4">
        {course?.courseContent?.map((section) => (
          <details
            key={section._id}
            open
            className="group rounded-lg border border-border bg-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <Layers className="h-4 w-4 text-primary" />
                <p className="truncate text-sm font-semibold text-foreground">
                  {section.sectionName}
                </p>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                  {section.subSection?.length || 0}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }
                  className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Edit section"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setConfirm({
                      text1: "Delete this section?",
                      text2: "All lectures in this section will be deleted.",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => onDeleteSection(section._id),
                      btn2Handler: () => setConfirm(null),
                    })
                  }
                  className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Delete section"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </div>
            </summary>

            <div className="border-t border-border px-4 py-3">
              <ul className="flex flex-col gap-1">
                {section?.subSection?.map((data) => (
                  <li
                    key={data._id}
                    onClick={() => setViewSubSection(data)}
                    className="group/sub flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors hover:bg-secondary/60"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      <p className="truncate text-sm text-foreground">
                        {data.title}
                      </p>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 opacity-0 transition-opacity group-hover/sub:opacity-100"
                    >
                      <button
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                        className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirm({
                            text1: "Delete this lecture?",
                            text2: "This lecture will be removed permanently.",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              onDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirm(null),
                          })
                        }
                        className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setAddSubsection(section._id)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Plus className="h-3 w-3" /> Add lecture
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit
        />
      ) : null}

      {confirm && <ConfirmationModal modalData={confirm} />}
    </>
  );
}
