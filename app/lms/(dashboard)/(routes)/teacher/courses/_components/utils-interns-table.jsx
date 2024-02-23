export const coursesColumns = [
  {
    accessorKey: "title",
    label: "Titre",
    sortable: true,
  },
  {
    accessorKey: "price",
    label: "Prix",
    sortable: true,
  },
  {
    accessorKey: "isPublished",
    label: "Publié",
    sortable: true,
  },
  {
    accessorKey: "actions",
    label: "Actions",
  },
  // {
  //   accessorKey: "createdAt",
  //   label: "Créé le",
  // },
  // {
  //   accessorKey: "updatedAt",
  //   label: "Mis à jour le",
  // },
];

export const statusOptions = [
  { name: "Publié", key: "true", color: "success" },
  { name: "Privé", key: "false", color: "muted-foreground" },
];
