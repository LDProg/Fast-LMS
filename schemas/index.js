import * as y from "yup";

export const LoginSchema = y.object({
  email: y
    .string()
    .email("Veuillez renseigner une adresse email valide")
    .required("Un email est requis"),
  password: y
    .string()
    .min(1, "Veuillez rentrer votre mot de passe")
    .required("Votre mot de passe est requis"),
});

export const RegisterSchema = y.object({
  firstName: y
    .string()
    .min(1, "Un prénom est requis")
    .required("Votre prénom est requis"),

  lastName: y
    .string()
    .min(1, "Un nom est requis")
    .required("Votre nom est requis"),
  email: y
    .string()
    .email("Veuillez renseigner une adresse email valide")
    .required("Un email est requis"),
  password: y
    .string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .required("Un mot de passe est requis"),
});

export const InternEmailSchema = y.object({
  from: y
    .string()
    .min(1, "Un email d'envoi est requis")
    .required("Un email d'envoi est requis"),

  to: y
    .string()
    .min(1, "Un destinataire est requis")
    .required("Un destinataire est requis"),
  subject: y.string(),
  content: y
    .string()
    .min(1, "Votre message doit contenir au moins 1 caractère.")
    .required("Un message est requis"),
});

export const CreateCourseSchema = y.object({
  title: y.string().min(1, "Une titre est requis"),
});

export const TitleCourseSchema = y.object({
  title: y.string().min(1, "Un titre est requis"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const DescriptionCourseSchema = y.object({
  description: y.string().min(1, "Une description est requise"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const ImageCourseSchema = y.object({
  imageUrl: y.string().min(1, "Une url valide est requise"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const CategoryCourseSchema = y.object({
  category: y.string().min(1, "Une categorie est requise"),
  categoryId: y.string().min(1, "Un id valide est requis"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const PriceCourseSchema = y.object({
  price: y.number().min(0, "Un prix valide est requis"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const AttachmentCourseSchema = y.object({
  url: y.string().min(1, "Un eurl valide est requise"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const DeleteAttachmentCourseSchema = y.object({
  id: y.string().min(1, "Un id de fichier valide est requis"),
  courseId: y.string().min(1, "Un id de cours valide est requis"),
});

export const ChaptersCourseSchema = y.object({
  title: y.string().min(1, "Un titre est requis"),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const DeleteCourseSchema = y.object({
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const PublishCourseSchema = y.object({
  isPublished: y.boolean().default(false),
  courseId: y.string().min(1, "Un id valide est requis"),
});

export const TitleChapterSchema = y.object({
  title: y.string().min(1, "Un titre est requis"),
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});

export const DescriptionChapterSchema = y.object({
  description: y.string().min(1, "Une description est requise"),
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});

export const AccessChapterSchema = y.object({
  isFree: y.boolean().default(false),
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});

export const VideoChapterSchema = y.object({
  videoUrl: y.string().min(1, "Une url valide est requise"),
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});

export const DeleteChapterSchema = y.object({
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});

export const PublishChapterSchema = y.object({
  isPublished: y.boolean().default(false),
  courseId: y.string().min(1, "Un id valide est requis"),
  chapterId: y.string().min(1, "Un id valide est requis"),
});
