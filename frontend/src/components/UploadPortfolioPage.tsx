import { ArrowLeft, CheckCircle2, FileUp, Github, Linkedin, Link as LinkIcon, Loader2, Upload } from "lucide-react";
import { FormEvent, useState } from "react";
import { createProfile, uploadProfileResume } from "../lib/api";
import { PremiumButton } from "./PremiumButton";

const initialForm = {
  company: "",
  experience_type: "",
  github_url: "",
  linkedin_url: "",
  name: "",
  portfolio_url: "",
  role: "",
};

const resumeAccept = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function isSupportedResume(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension === "pdf" || extension === "doc" || extension === "docx";
}

export function UploadPortfolioPage() {
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleResumeChange(file: File | null) {
    if (file && !isSupportedResume(file)) {
      setResume(null);
      setError("Choose a PDF, DOC, or DOCX resume file.");
      return;
    }

    setError("");
    setResume(file);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (resume && !isSupportedResume(resume)) {
        throw new Error("Choose a PDF, DOC, or DOCX resume file.");
      }

      const profile = await createProfile({
        company: form.company.trim() || null,
        experience_type: form.experience_type.trim(),
        github_url: form.github_url.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        name: form.name.trim(),
        portfolio_url: form.portfolio_url.trim() || null,
        role: form.role.trim(),
      });

      if (resume) {
        await uploadProfileResume(profile.id, resume);
      }

      setSuccess("Portfolio uploaded successfully.");
      setForm(initialForm);
      setResume(null);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Could not upload your portfolio.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="upload-page">
      <div className="upload-shell">
        <a className="upload-back-link" href="/gallery">
          <ArrowLeft size={18} />
          Gallery
        </a>

        <section className="upload-panel" aria-labelledby="upload-title">
          <div className="upload-heading">
            <span className="upload-heading-icon" aria-hidden="true">
              <Upload size={22} />
            </span>
            <div>
              <h1 id="upload-title">Upload Portfolio</h1>
              <p>Share your profile links so others can discover your work.</p>
            </div>
          </div>

          <form className="upload-form" onSubmit={handleSubmit}>
            <div className="upload-field-grid">
              <label>
                <span>Name</span>
                <input
                  autoComplete="name"
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your full name"
                  required
                  type="text"
                  value={form.name}
                />
              </label>

              <label>
                <span>Role</span>
                <input
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Frontend Developer"
                  required
                  type="text"
                  value={form.role}
                />
              </label>
            </div>

            <div className="upload-field-grid">
              <label>
                <span>Experience</span>
                <input
                  onChange={(event) => updateField("experience_type", event.target.value)}
                  placeholder="Student, Internship, Full-time"
                  required
                  type="text"
                  value={form.experience_type}
                />
              </label>

              <label>
                <span>Company</span>
                <input
                  onChange={(event) => updateField("company", event.target.value)}
                  placeholder="Optional"
                  type="text"
                  value={form.company}
                />
              </label>
            </div>

            <label>
              <span>
                <LinkIcon size={16} />
                Portfolio URL
              </span>
              <input
                onChange={(event) => updateField("portfolio_url", event.target.value)}
                placeholder="https://your-portfolio.com"
                type="url"
                value={form.portfolio_url}
              />
            </label>

            <div className="upload-field-grid">
              <label>
                <span>
                  <Github size={16} />
                  GitHub
                </span>
                <input
                  onChange={(event) => updateField("github_url", event.target.value)}
                  placeholder="https://github.com/you"
                  type="url"
                  value={form.github_url}
                />
              </label>

              <label>
                <span>
                  <Linkedin size={16} />
                  LinkedIn
                </span>
                <input
                  onChange={(event) => updateField("linkedin_url", event.target.value)}
                  placeholder="https://linkedin.com/in/you"
                  type="url"
                  value={form.linkedin_url}
                />
              </label>
            </div>

            <label className="upload-file-field">
              <span>
                <FileUp size={16} />
                Resume
              </span>
              <input
                accept={resumeAccept}
                onChange={(event) => handleResumeChange(event.target.files?.[0] ?? null)}
                type="file"
              />
              <strong>{resume ? resume.name : "Optional PDF, DOC, or DOCX upload"}</strong>
            </label>

            {error && <p className="upload-message upload-error">{error}</p>}
            {success && (
              <p className="upload-message upload-success">
                <CheckCircle2 size={17} />
                {success}
              </p>
            )}

            <PremiumButton
              className="upload-submit-button"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader2 className="upload-spin" size={18} /> : <Upload size={18} />}
              size="lg"
              type="submit"
              variant="blue"
            >
              {isSubmitting ? "Uploading" : "Upload Portfolio"}
            </PremiumButton>
          </form>
        </section>
      </div>
    </main>
  );
}
