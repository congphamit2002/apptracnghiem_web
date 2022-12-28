package com.app.apptracnghiem_web.controller;//package com.cybersoft.webtoeic.controller;
//
//import com.cybersoft.webtoeic.payload.ListenTestRequest;
//import com.google.gson.Gson;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.net.URI;
//import java.net.URISyntaxException;
//import java.net.http.HttpRequest;
//
//@Controller
//@RequestMapping("/admin/listenmanagement")
//public class ControlListenTestController {
//
//    @PostMapping(value = "/add", consumes =  { MediaType.MULTIPART_FORM_DATA_VALUE })
//        public ModelAndView rederectListenTest(@RequestParam("listenName") String listenName,
//                                               @RequestParam("listenPart") int listenPart,
//                                               @RequestParam("fileExcel") MultipartFile fileExcel,
//                                               @RequestParam("fileImageListen") MultipartFile fileImageListen,
//                                               @RequestParam("fileImageQuestion") MultipartFile[] fileImageQuestion,
//                                               @RequestParam("fileAudio") MultipartFile[] fileAudio,
//                                               ModelMap model) {
//
//        try {
//            Gson gson = new Gson();
//            ListenTestRequest listenTestRequest = new ListenTestRequest();
//            listenTestRequest.setListenName(listenName);
//            listenTestRequest.setListenPart(listenPart);
////            listenTestRequest.setFileExcel(fileExcel);
////            listenTestRequest.setFileImageListen(fileImageListen);
////            listenTestRequest.setFileImageQuestion(fileImageQuestion);
////            listenTestRequest.setFileAudio(fileAudio);
//
//            System.out.println(fileAudio.toString()  + "  645");;
//
//            String data = gson.toJson(listenTestRequest);
//
//            System.out.println("JSON : " + data);
//
//            HttpRequest request = HttpRequest.newBuilder()
//                    .uri(new URI("http://localhost/api/listen/saveFile"))
//                    .POST(HttpRequest.BodyPublishers.);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//
//        return new ModelAndView("redirect:/admin/listenmanagement", model);
//
//    }
//
//}
