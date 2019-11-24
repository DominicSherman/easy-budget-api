export const getDataFromQuerySnapshot = (querySnapshot: FirebaseFirestore.QuerySnapshot): any[] => {
    let data = [];

    querySnapshot.forEach((doc) => {
        data = [
            ...data,
            doc.data()
        ];
    });

    return data;
};
