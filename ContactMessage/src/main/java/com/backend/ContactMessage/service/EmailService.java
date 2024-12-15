package com.backend.ContactMessage.service;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String messageContent) {
        try {
            var mimeMessage = mailSender.createMimeMessage();
            var helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom("mounaettalbi@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(messageContent);
            mailSender.send(mimeMessage);
        } catch (MailException e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de l'envoi de l'email");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }


    }
}
