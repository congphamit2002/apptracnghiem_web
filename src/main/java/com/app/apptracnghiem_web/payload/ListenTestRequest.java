package com.app.apptracnghiem_web.payload;

import org.springframework.web.multipart.MultipartFile;

public class ListenTestRequest {
    private String listenName;
    private int listenPart;
    private MultipartFile fileExcel;
    private MultipartFile fileImageListen;
    private MultipartFile[] fileImageQuestion;
    private MultipartFile[] fileAudio;

    public MultipartFile getFileImageListen() {
        return fileImageListen;
    }

    public void setFileImageListen(MultipartFile fileImageListen) {
        this.fileImageListen = fileImageListen;
    }

    public String getListenName() {
        return listenName;
    }

    public void setListenName(String listenName) {
        this.listenName = listenName;
    }

    public int getListenPart() {
        return listenPart;
    }

    public void setListenPart(int listenPart) {
        this.listenPart = listenPart;
    }

    public MultipartFile getFileExcel() {
        return fileExcel;
    }

    public void setFileExcel(MultipartFile fileExcel) {
        this.fileExcel = fileExcel;
    }

    public MultipartFile[] getFileImageQuestion() {
        return fileImageQuestion;
    }

    public void setFileImageQuestion(MultipartFile[] fileImageQuestion) {
        this.fileImageQuestion = fileImageQuestion;
    }

    public MultipartFile[] getFileAudio() {
        return fileAudio;
    }

    public void setFileAudio(MultipartFile[] fileAudio) {
        this.fileAudio = fileAudio;
    }
}
