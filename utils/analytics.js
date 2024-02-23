import prisma from "@/lib/prisma";

const groupByCourse = (purchases) => {
  const grouped = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price;
  });

  return grouped;
};

export const getAnalytics = async (userId) => {
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total,
      })
    );

    const totalRevenue = data.reduce((acc, { total }) => acc + total, 0);
    const totalSales = purchases.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    return { error: "Une erreur s'est produite." };
  } finally {
    await prisma.$disconnect();
  }
};

export const getAnalyticsForCurrentMonth = async (userId) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1 pour obtenir le mois actuel

    const purchases = await prisma.purchase.findMany({
      where: {
        course: {
          userId,
        },
        createdAt: {
          gte: new Date(currentDate.getFullYear(), currentMonth - 1, 1), // Date de début du mois en cours
          lt: new Date(currentDate.getFullYear(), currentMonth, 1), // Date de début du mois suivant
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const dataCurrentMonth = Object.entries(groupedEarnings).map(
      ([courseTitle, total]) => ({
        name: courseTitle,
        total,
      })
    );

    const totalRevenue = dataCurrentMonth.reduce(
      (acc, { total }) => acc + total,
      0
    );
    const totalSales = purchases.length;

    return {
      dataCurrentMonth,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    return { error: "Une erreur s'est produite." };
  } finally {
    await prisma.$disconnect();
  }
};

// avec ca j'arrive à avoir toutes les données pour tous les achats des cours d'un utilisateur mais j'aimerais avoir en plus une fonctions qui fais pareil mais juste pour le mois en cours

export const getAnalyticsForLast12Months = async (userId) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1 pour obtenir le mois actuel

    const dataLast12Months = [];
    let totalRevenue = 0;
    let totalSales = 0;

    for (let i = 0; i < 12; i++) {
      let month = currentMonth - i;
      let year = currentYear;

      // Adjust month and year for past months
      if (month <= 0) {
        month += 12;
        year -= 1;
      }

      const purchases = await prisma.purchase.findMany({
        where: {
          course: {
            userId,
          },
          createdAt: {
            gte: new Date(year, month - 1, 1), // Date de début du mois
            lt: new Date(year, month, 1), // Date de début du mois suivant
          },
        },
        include: {
          course: true,
        },
      });

      const groupedEarnings = groupByCourse(purchases);
      const totalMonthRevenue = Object.values(groupedEarnings).reduce(
        (acc, total) => acc + total,
        0
      );

      totalRevenue += totalMonthRevenue;
      totalSales += purchases.length;

      const monthName = getMonthName(month); // Fonction pour obtenir le nom du mois en fonction du numéro du mois

      dataLast12Months.unshift({
        name: monthName,
        total: totalMonthRevenue,
      });
    }

    return { dataLast12Months, totalRevenue, totalSales };
  } catch (error) {
    return { error: "Une erreur s'est produite." };
  } finally {
    await prisma.$disconnect();
  }
};

const getMonthName = (month) => {
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  // Ajouter une vérification pour le mois égal à 0
  return month === 0 ? monthNames[11] : monthNames[month - 1];
};
