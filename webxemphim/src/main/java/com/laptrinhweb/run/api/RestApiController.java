package com.laptrinhweb.run.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhweb.run.model.*;
import com.laptrinhweb.run.service.*;

@RestController
@RequestMapping("/api")
public class RestApiController {

	public static Logger logger = LoggerFactory.getLogger(RestApiController.class);

////////////////Account
	@Autowired
	AccountService accountService;

	@CrossOrigin
	@RequestMapping(value = "/account/", method = RequestMethod.GET)
	public ResponseEntity<List<Account>> listAllAccount() {
		List<Account> listAccount = accountService.findAll();
		if (listAccount.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Account>>(listAccount, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET)
	public Account findAccount(@PathVariable("id") Integer id) {
		Account account = accountService.getOne(id);
		if (account == null) {
			ResponseEntity.notFound().build();
		}
		return account;
	}

	@CrossOrigin
	@RequestMapping(value = "/account/{id}", method = RequestMethod.DELETE)
	public int deleteAccount(@PathVariable(value = "id") Integer id) {
		Account account = accountService.getOne(id);
		if (account == null) {
			return 0;
		} else {
			accountService.delete(account);
			return 1;
		}
	}

////////////////Login

	@CrossOrigin
	@RequestMapping(value = "/login/", method = RequestMethod.POST)
	public int Login(@Valid @RequestBody Account account) {
		List<Account> listAccount = accountService.findAll();
		for (Account a : listAccount) {
			if (a.getUsername().compareTo(account.getUsername()) == 0
					&& a.getPassword().compareTo(account.getPassword()) == 0) {
				return 1;
			}
		}
		return 0;
	}

////////////////Register
	@CrossOrigin
	@RequestMapping(value = "/register/", method = RequestMethod.POST)
	public int Register(@Valid @RequestBody Account account) {
		List<Account> listAccount = accountService.findAll();
		for (Account a : listAccount) {
			if (a.getUsername().compareTo(account.getUsername()) == 0) {
				return 0;
			}
		}
		accountService.save(account);
		return 1;
	}

////////////////Cinema
	@Autowired
	CinemaService cinemaService;

	@CrossOrigin
	@RequestMapping(value = "/cinema/", method = RequestMethod.GET)
	public ResponseEntity<List<Cinema>> listAllCinema() {
		List<Cinema> listCinema = cinemaService.findAll();
		if (listCinema.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Cinema>>(listCinema, HttpStatus.OK);
	}

////////////////Room
	@Autowired
	RoomService roomService;

	@CrossOrigin
	@RequestMapping(value = "/room/", method = RequestMethod.GET)
	public ResponseEntity<List<Room>> listAllRoom() {
		List<Room> listRoom = roomService.findAll();
		if (listRoom.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Room>>(listRoom, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/room/{id}", method = RequestMethod.GET)
	public Room findRoom(@PathVariable("id") Integer id) {
		Room room = roomService.getOne(id);
		if (room == null) {
			ResponseEntity.notFound().build();
		}
		return room;
	}

	@CrossOrigin
	@RequestMapping(value = "/room/", method = RequestMethod.POST)
	public int saveRoom(@Valid @RequestBody Room room) {
		if (room == null) {
			return 0;
		} else {
			roomService.save(room);
			return 1;
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/room/{id}", method = RequestMethod.DELETE)
	public int deleteRoom(@PathVariable(value = "id") Integer id) {
		Room room = roomService.getOne(id);
		if (room == null) {
			return 0;
		} else {
			roomService.delete(room);
			return 1;
		}
	}

////////////////Film
	@Autowired
	FilmService filmService;

	@CrossOrigin
	@RequestMapping(value = "/film/", method = RequestMethod.GET)
	public ResponseEntity<List<Film>> listAllFilm() {
		List<Film> listFilm = filmService.findAll();
		if (listFilm.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Film>>(listFilm, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/film/{id}", method = RequestMethod.GET)
	public Film findFilm(@PathVariable("id") Integer id) {
		Film film = filmService.getOne(id);
		if (film == null) {
			ResponseEntity.notFound().build();
		}
		return film;
	}

	@CrossOrigin
	@RequestMapping(value = "/film/", method = RequestMethod.POST)
	public int saveFilm(@Valid @RequestBody Film film) {
		if (film == null) {
			return 0;
		} else {
			filmService.save(film);
			return 1;
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/film/{id}", method = RequestMethod.DELETE)
	public int deleteFilm(@PathVariable(value = "id") Integer id) {
		Film film = filmService.getOne(id);
		if (film == null) {
			return 0;
		} else {
			filmService.delete(film);
			return 1;
		}
	}

////////////////Seat
	@Autowired
	SeatService seatService;

	@CrossOrigin
	@RequestMapping(value = "/seat/", method = RequestMethod.GET)
	public ResponseEntity<List<Seat>> listAllSeat() {
		List<Seat> listSeat = seatService.findAll();
		if (listSeat.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Seat>>(listSeat, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/seat/{idroom}", method = RequestMethod.GET)
	public ResponseEntity<List<Seat>> listAllSeatbyIdroom(@PathVariable(value = "idroom") Integer idroom) {
		List<Seat> listSeat = seatService.findAll();
		List<Seat> listSeatbyId = new ArrayList<Seat>();
		for (Seat a : listSeat) {
			if (a.getIdroom() == idroom) {
				listSeatbyId.add(a);
			}
		}
		if (listSeatbyId.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Seat>>(listSeatbyId, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/seat/", method = RequestMethod.POST)
	public int saveSeat(@Valid @RequestBody Seat seat) {
		if (seat == null) {
			return 0;
		} else {
			seatService.save(seat);
			return 1;
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/seat/{id}", method = RequestMethod.DELETE)
	public int deleteSeat(@PathVariable(value = "id") Integer id) {
		Seat seat = seatService.getOne(id);
		if (seat == null) {
			return 0;
		} else {
			seatService.delete(seat);
			return 1;
		}
	}

////////////////Book
	@Autowired
	BookService bookService;

	@CrossOrigin
	@RequestMapping(value = "/book/", method = RequestMethod.GET)
	public ResponseEntity<List<Book>> listAllBook() {
		List<Book> listBook = bookService.findAll();
		if (listBook.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Book>>(listBook, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/book/{idshowtimes}", method = RequestMethod.GET)
	public ResponseEntity<List<Book>> getAllBookbyIdShowtimes(@PathVariable("idshowtimes") Integer idshowtimes) {
		List<Book> listBook = bookService.findAll();
		List<Book> listBookbyId = new ArrayList<Book>();
		for (Book b : listBook) {
			if (b.getIdshowtimes() == idshowtimes) {
				listBookbyId.add(b);
			}
		}
		if (listBookbyId.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Book>>(listBookbyId, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/book/", method = RequestMethod.POST)
	public int saveBook(@Valid @RequestBody Book book) {
		if (book == null) {
			return 0;
		} else {
			bookService.save(book);
			return book.getId();
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/book/{id}", method = RequestMethod.DELETE)
	public int deleteBook(@PathVariable(value = "id") Integer id) {
		Book book = bookService.getOne(id);
		if (book == null) {
			return 0;
		} else {
			bookService.delete(book);
			return 1;
		}
	}

////////////////Showtimes
	@Autowired
	ShowtimesService showtimesService;

	@CrossOrigin
	@RequestMapping(value = "/showtimes/", method = RequestMethod.GET)
	public ResponseEntity<List<Showtimes>> listAllShowtimes() {
		List<Showtimes> listShowtimes = showtimesService.findAll();
		if (listShowtimes.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Showtimes>>(listShowtimes, HttpStatus.OK);
	}

	@CrossOrigin
	@RequestMapping(value = "/showtimes/{id}", method = RequestMethod.GET)
	public Showtimes findShowtimes(@PathVariable("id") Integer id) {
		Showtimes showtimes = showtimesService.getOne(id);
		if (showtimes == null) {
			ResponseEntity.notFound().build();
		}
		return showtimes;
	}

	@CrossOrigin
	@RequestMapping(value = "/showtimes/", method = RequestMethod.POST)
	public int saveShowtimes(@Valid @RequestBody Showtimes showtimes) {
		if (showtimes == null) {
			return 0;
		} else {
			showtimesService.save(showtimes);
			return 1;
		}
	}

	@CrossOrigin
	@RequestMapping(value = "/showtimes/{id}", method = RequestMethod.DELETE)
	public int deleteShowtimes(@PathVariable(value = "id") Integer id) {
		Showtimes showtimes = showtimesService.getOne(id);
		if (showtimes == null) {
			return 0;
		} else {
			showtimesService.delete(showtimes);
			return 1;
		}
	}
}
