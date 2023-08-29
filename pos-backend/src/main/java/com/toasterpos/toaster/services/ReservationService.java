package com.toasterpos.toaster.services;

import com.toasterpos.toaster.models.Customer;
import com.toasterpos.toaster.models.Reservation;
import com.toasterpos.toaster.models.dtos.ReservationDto;
import com.toasterpos.toaster.models.dtos.ReservationResponseDto;
import com.toasterpos.toaster.respositories.CustomerRepository;
import com.toasterpos.toaster.respositories.ReservationRepository;
import com.toasterpos.toaster.utils.ResponseDtoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public List<ReservationResponseDto> getAllReservations() {
        return reservationRepository.findAll().stream().filter(Objects::nonNull).map(ResponseDtoUtils::copyReservationResponse).collect(Collectors.toList());
    }

    public ReservationResponseDto createNewReservation(ReservationDto reservation) {
        Customer customer = customerRepository.findById(reservation.getCustomerId()).orElseThrow();
        Reservation newReservation = new Reservation();
        newReservation.setReservationTo(reservation.getReservationTo());
        newReservation.setReservationFrom(reservation.getReservationFrom());
        newReservation.setCustomer(customer);
        return ResponseDtoUtils.copyReservationResponse(reservationRepository.save(newReservation));
    }

    public void deleteReservationById(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public List<ReservationResponseDto> getPastReservations() {
        return reservationRepository.findAllByReservationToLessThan(OffsetDateTime.now()).stream().filter(Objects::nonNull)
                .map(ResponseDtoUtils::copyReservationResponse).collect(Collectors.toList());
    }

    public List<ReservationResponseDto> getNowReservations() {
        return reservationRepository.findAllByReservationFromGreaterThanEqual(OffsetDateTime.now()).stream().filter(Objects::nonNull)
                .map(ResponseDtoUtils::copyReservationResponse).collect(Collectors.toList());
    }
}
