class cacheEngine {
  LRUCacheStore(object = { key, value }) {}
  cacheGet(key) {}
  // This is function first update local cache (since record object is in the local cache),
  // then update CRUD backend
  writeThrough(updateState = { key, value }) {}
  // This is function first update CRUD backend (since record object is not in the local cache),
  // then update the local cache
  writeBack(updateState = { key, value }) {}
}
class searchEngine {
  searchArticles(context) {}
}
class notificationEngine {
  pushNotification(newsLetters) {}
  registerEvent(event) {}
}
class LoginEngine {
  reqLogin(username, password) {}
  reqAnonymousLogin() {}
  getUserInfo() {}
}

class UI {
  renderComponent(state) {}
}
class suggestionEngine {
  getUserPreference() {}
  getUserLikedArticles() {}
  generateSuggestionArticles() {}
}



public interface IArticle {
  public String title;
  public String content;
  public Image image;
}

public class Article implements IArticle {
  private String title;
  private String content;
  private Image image;

  public String getTitle() { return title; }
  public String getContent() { return content; }
  public Image getImage() { return image; }
}

public class ArticleStub implements IArticle {
  IRespository repository;

  public String getTitle() { return repository.Article.title; }
  public String getContent() { return repository.Article.content; }
  public Image getImage() { return repository.Article.image; }
}


public class ArticleSkeleton {
  public IServer server;

  public Socket connectServerSocket() {return server};
  public Method selectMethod(Method method) {return method}
  public void flushToDatabase(Object Data){return response}
}

  
/*
*
*Author: Xinyi Zhu
*Date 2018/10/17
*
* Midterm
*
*
*Description: This folder contains the body of the array product dot
*this function is that  Given two arrays, you can compute their dot product
*by multiplying elementsbetween the two arrays and taking their sum.
*
*
*/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include "array_utils.h"

int dotProduct(const int *a, const int *b, int n, int *result) {
  // check if the pointer is NULl or not
  if (a == NULL || b==0) {
    return 1;
  }
  // check the size of the array is right or not
  if (n < 0) {
    return 1;
  }

  int i = 0, total = 0;
  // make a loop to let these two array multiply and get the sum of them
  for (i = 0; i < n; i++) {
    total = (a[i]) * (b[i]) + total;
  }

  *result = total;

  return 0;
}


int * append(const int *a, int n, const int *b, int m){
int *array = (int *)malloc(sizeof(int) * (n+m));

int i,j,q=0;
int k=n+m;
int A[n],B[n];
for(i=0;i<n;i++){
  A[i]=a[i];
}
for(i=0;i<m;i++){
  B[i]=b[i];
}

for(i=0;i<n;i++){
  array[i]=A[i];
}

for(j=n;j<k;j++){
  array[j]=B[j];
}
for(i=0;i<n+m;i++){
   printf("array[i]=%d\n",array[i] );
}
  return array;
}
