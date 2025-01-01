package com.backend.resultat_service.service.impl;

import com.backend.resultat_service.dto.ResultatDTO;
import com.backend.resultat_service.entity.Resultat;
import com.backend.resultat_service.mapper.ResultatMapper;
import com.backend.resultat_service.repository.ResultatRepository;
import com.backend.resultat_service.service.ResultatService;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.PdfDocument;

import java.io.ByteArrayOutputStream;

import com.itextpdf.layout.element.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class ResultatServiceImpl implements ResultatService {

    @Autowired
    private ResultatRepository resultatRepository;

    @Autowired
    private ResultatMapper resultatMapper;

    @Override
    public Resultat addResultat(ResultatDTO resultatDTO) {
        Resultat resultat = resultatMapper.toEntity(resultatDTO);
        return resultatRepository.save(resultat);
    }

    @Override
    public Resultat updateResultat(Long id, ResultatDTO resultatDTO) {
        Resultat resultat = resultatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resultat non trouvé"));
        resultatMapper.updateEntityFromDTO(resultatDTO, resultat);
        return resultatRepository.save(resultat);
    }

    @Override
    public void deleteResultat(Long id) {
        resultatRepository.deleteById(id);
    }

    @Override
    public List<Resultat> getAllResultats() {
        return resultatRepository.findAll();
    }

    @Override
    public Optional<Resultat> getResultatById(Long id) {
        return resultatRepository.findById(id);
    }


    @Override
    public byte[] generateRapportPDF(Long id) {
        Resultat resultat = resultatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Résultat non trouvé"));

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            // Création d'un PdfWriter avec le flux de sortie
            PdfWriter writer = new PdfWriter(outputStream);

            // Création d'un PdfDocument
            PdfDocument pdfDocument = new PdfDocument(writer);

            // Création d'un Document iText 7 (pour ajouter des éléments au PDF)
            com.itextpdf.layout.Document document = new com.itextpdf.layout.Document(pdfDocument);

            // Ajouter le logo au header (supposons que le logo soit situé dans le répertoire "resources/static/images/logo.png")
            Image logo = new Image(ImageDataFactory.create(getClass().getClassLoader().getResource("static/images/logo2.png")));

            logo.setHeight(110);  // Ajustez la taille du logo
            logo.setWidth(110);   // Ajustez la taille du logo
            document.add(logo);  // Ajouter l'image au document

            // Ajouter un espace après le logo
            document.add(new com.itextpdf.layout.element.Paragraph("\n"));

            // Ajouter le titre du rapport
            document.add(new com.itextpdf.layout.element.Paragraph("Rapport de Résultat").setBold().setFontSize(18));

            // Ajouter la date du jour
            String todayDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy"));
            document.add(new com.itextpdf.layout.element.Paragraph("Date: " + todayDate).setItalic());

            document.add(new com.itextpdf.layout.element.Paragraph("\n\n"));


            // Formuler un texte professionnel avec les informations du résultat, en mettant les valeurs en gras et ajustant la taille de la police
            document.add(new com.itextpdf.layout.element.Paragraph(
                    "Le rapport présente les détails du résultat de l'examen effectué. " +
                            "L'ID du résultat est : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(String.valueOf(resultat.getId())).setBold()).setFontSize(15)
                    .add(". " +
                            "L'ID de l'examen associé est : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(String.valueOf(resultat.getFkIdExamen())).setBold()).setFontSize(15)
                    .add(". " +
                            "Les valeurs mesurées pendant l'examen sont : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(resultat.getValeursMesurees()).setBold()).setFontSize(15)
                    .add(". " +
                            "Les observations faites par le médecin lors de l'examen sont les suivantes : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(resultat.getObservations()).setBold()).setFontSize(15)
                    .add(". " +
                            "Des commentaires supplémentaires faites par le Technicien ont été fournis : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(resultat.getCommentaires()).setBold()).setFontSize(15)
                    .add(". " +
                            "Le statut actuel du résultat est le suivant : ").setFontSize(15)
                    .add(new com.itextpdf.layout.element.Text(resultat.getStatus()).setBold()).setFontSize(15)
            );

            // Ajouter un espace avant la signature
            document.add(new com.itextpdf.layout.element.Paragraph("\n\n"));

// Ajouter la signature sous forme de texte
            document.add(new com.itextpdf.layout.element.Paragraph("Signature : ___________________________"));
            document.add(new com.itextpdf.layout.element.Paragraph("Nom du signataire : ").setItalic());
            document.add(new com.itextpdf.layout.element.Paragraph("Date : " + todayDate).setItalic());

// Ajouter une image de la signature (si nécessaire)
            Image signatureImage = new Image(ImageDataFactory.create(getClass().getClassLoader().getResource("static/images/signature.png")));
            signatureImage.setWidth(120);  // Ajustez la taille de l'image
            signatureImage.setHeight(120);  // Ajustez la taille de l'image
            document.add(signatureImage);



            // Fermeture du document PDF
            document.close();

            // Retourner le PDF sous forme de tableau d'octets
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF", e);
        }
    }


    @Override
    public Resultat updateStatus(Long id, String status) {
        Resultat resultat = resultatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resultat non trouvé"));
        resultat.setStatus(status);
        return resultatRepository.save(resultat);
    }
}

