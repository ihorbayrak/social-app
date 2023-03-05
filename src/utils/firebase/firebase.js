// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, uploadString, ref, deleteObject } from 'firebase/storage';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    query,
    getDocs,
} from 'firebase/firestore';

import {
    getAuth,
    onAuthStateChanged,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB0__gC-TRRrohbdDBxVLBNCYvMmY-_QiU',
    authDomain: 'social-app-39ee3.firebaseapp.com',
    projectId: 'social-app-39ee3',
    storageBucket: 'social-app-39ee3.appspot.com',
    messagingSenderId: '656946973785',
    appId: '1:656946973785:web:7891cd596069fdd9e27548',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const db = getFirestore(app);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithFacebookPopup = () => signInWithPopup(auth, facebookProvider);

export const createUserDocumentFromAuth = async (user, additionalInformation = {}) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email, photoURL } = user;
        const joined = new Date();

        try {
            await setDoc(userDocRef, {
                id: user.uid,
                name: displayName,
                avatar: photoURL,
                username: email.slice(0, email.indexOf('@')),
                joined,
                ...additionalInformation,
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    return userDocRef;
};

export const getUserDocument = async (userId) => {
    if (!userId) return;

    const userDocRef = doc(db, 'users', userId);

    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        alert('No user!');
    }
};

export const getUsersDocuments = async () => {
    const usersRef = collection(db, 'users');

    const q = query(usersRef);

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

    return users;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const addPostDocument = async (post, ...additional) => {
    if (!post) return;

    const [,selectedFile] = additional;

    const collectionRef = collection(db, 'posts');

    post.timestamp = serverTimestamp();

    const docRef = await addDoc(collectionRef, post);

    const postDocRef = doc(db, 'posts', docRef.id);

    const mediaRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
        await uploadString(mediaRef, selectedFile, 'data_url').then(async () => {
            const downloadURL = await getDownloadURL(mediaRef);

            await updateDoc(postDocRef, {
                image: downloadURL,
            });
        });
    }
};

export const addCommentDocument = async (comment, ...additional) => {
    const [postId, selectedFile] = additional;

    const collectionRef = collection(db, 'posts', postId, 'comments');

    comment.timestamp = serverTimestamp();

    const docRef = await addDoc(collectionRef, comment);

    const commentDocRef = doc(db, 'posts', postId, 'comments', docRef.id);

    const mediaRef = ref(storage, `comments/${docRef.id}/image`);

    if (selectedFile) {
        await uploadString(mediaRef, selectedFile, 'data_url').then(async () => {
            const downloadURL = await getDownloadURL(mediaRef);

            await updateDoc(commentDocRef, {
                image: downloadURL,
            });
        });
    }
};

export const getPostDocument = async (postId) => {
    if (!postId) return;

    const postDocRef = doc(db, 'posts', postId);

    const postSnapshot = await getDoc(postDocRef);

    if (postSnapshot.exists()) {
        return postSnapshot.data();
    } else {
        alert('There is no post! :(');
    }
};

export const addLikeToPost = async (user, postId) => {
    if (!user || !postId) return;

    const docRef = doc(db, 'posts', postId, 'likes', user?.id);

    await setDoc(docRef, {
        userId: user.id,
        postId,
        username: user.username,
    });
};

export const removeLikeFromPost = async (user, postId) => {
    if (!user || !postId) return;

    const docRef = doc(db, 'posts', postId, 'likes', user?.id);

    await deleteDoc(docRef);
};

export const deletePostDocument = async (postId) => {
    const docRef = doc(db, 'posts', postId);

    await deleteDoc(docRef);
};

export const deleteMediaFromStorage = async (postId) => {
    const mediaRef = ref(storage, `posts/${postId}/image`);

    await deleteObject(mediaRef);
};

export const addLikeToComment = async (user, postId, commentId) => {
    if (!user || !postId || !commentId) return;

    const docRef = doc(db, 'posts', postId, 'comments', commentId, 'likes', user?.id);

    await setDoc(docRef, {
        userId: user.id,
        commentId,
        username: user.username,
    });
};

export const removeLikeFromComment = async (user, postId, commentId) => {
    if (!user || !postId || !commentId) return;

    const docRef = doc(db, 'posts', postId, 'comments', commentId, 'likes', user?.id);

    await deleteDoc(docRef);
};
