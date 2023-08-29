package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Reservation;
import com.toasterpos.toaster.models.dtos.ReservationDto;
import com.toasterpos.toaster.models.dtos.ReservationResponseDto;
import com.toasterpos.toaster.services.ReservationService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping("/list")
    public @ResponseBody List<ReservationResponseDto> getAllReservations(){
        return reservationService.getAllReservations();
    }

    @GetMapping("/list_past")
    public @ResponseBody List<ReservationResponseDto> getPastReservations(){
        return reservationService.getPastReservations();
    }

    @GetMapping("/list_now")
    public @ResponseBody List<ReservationResponseDto> getNowReservations(){
        return reservationService.getNowReservations();
    }

    @PostMapping("/create")
    public @ResponseBody ReservationResponseDto createReservation(@RequestBody ReservationDto reservation){
        log.info("Received /reservation/create with reservation " + reservation);
        return reservationService.createNewReservation(reservation);
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteReservation(@RequestParam @NonNull Long reservationId){
        log.info("Received request /reservation/delete with reservation_id " + reservationId);
        try{
            reservationService.deleteReservationById(reservationId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /reservation/delete ",e);
            return null;
        }
    }
}
